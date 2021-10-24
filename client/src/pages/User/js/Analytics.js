import { Line } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';
import { getUser } from '../../../graphql/user';

export default function ListCamera(props) {
    const { loading, error, data } = useQuery(getUser);

    Date.prototype.formatMMDDYYYY = function () {
        return this.getDate() +
            "/" + (this.getMonth() + 1) +
            "/" + this.getFullYear();
    }
    Date.prototype.formatHHmm = function () {
        return this.getHours() + ':' + this.getMinutes();
    }
    const dataChart = () => {
        let rs = [];
        data?.user?.cameras?.forEach(camera => {
            camera?.reports?.forEach(report => {
                rs.push(report?.report_description?.length || 0);
            })
        })
        return rs;
    }
    const labelChart = () => {
        let rs = [];
        data?.user?.cameras?.forEach(camera => {
            camera?.reports?.forEach(report => {
                const time = new Date(report.createdAt);
                rs.push(new Date(time).formatHHmm());
            })
        })
        return rs;
    }
    const datasets = [{
        label: 'Number of reports',
        data: dataChart(),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }];

    const numberOfCameras = data?.user?.cameras?.length || 0;

    const numberOfVideos = () => {
        let rs = 0;
        data?.user?.cameras?.forEach(element => {
            rs += element?.videos?.length || 0;
        });
        return rs
    }
    const numberOfReports = () => {
        let rs = 0;
        data?.user?.cameras?.forEach(element => {
            rs += element?.reports?.length || 0;
        });
        return rs
    }
    const numberOfMales = () => {
        let arr = [];
        data?.user?.cameras?.forEach(element => {
            arr.push(
                element?.reports?.map(report => report?.report_description)
            )
        });
        arr = arr.flat(Infinity)
        arr = arr.filter(report_description => report_description?.gender === 'male')
        return arr.length;
    }
    const numberOfFemales = () => {
        let arr = [];
        data?.user?.cameras?.forEach(element => {
            arr.push(
                element?.reports?.map(report => report?.report_description)
            )
        });
        arr = arr.flat(Infinity)
        arr = arr.filter(report_description => report_description?.gender === 'female')
        return arr.length;
    }
    const averageAge = () => {
        let rs = 0;
        let arr = [];
        data?.user?.cameras?.forEach(element => {
            arr.push(
                element?.reports?.map(report => report?.report_description)
            )
        });
        arr = arr.flat(Infinity)
        arr.forEach(report_description => {
            rs += report_description?.age;
        })
        rs = Math.round(rs / arr.length);
        return rs;
    }
    const table = () => {
        return (
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Time</th>
                        <th scope="col">Male</th>
                        <th scope="col">Female</th>
                        <th scope="col">Age</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.user?.cameras?.map((camera, index) => {
                            return camera.reports?.map((report, index) => {
                                const time = new Date(report.createdAt);
                                const male = report?.report_description?.filter(item => item?.gender === 'male').length || 0;
                                const female = report?.report_description?.filter(item => item?.gender === 'female').length || 0;
                                let age = report?.report_description?.reduce(((pre, cur) => pre + cur.age), 0);
                                age = age / (report?.report_description?.length || 1);
                                age = Math.round(age / report?.report_description?.length)
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{new Date(time).formatMMDDYYYY()} {new Date(time).formatHHmm()}</td>
                                        <td>{male}</td>
                                        <td>{female}</td>
                                        <td>{age}</td>
                                    </tr>
                                )
                            })
                        })
                    }
                </tbody>
            </table>
        )
    }

    return (
        <div className='analytics'>
            <p className='title'>Thống kê</p>
            <div className='pane1'>
                <div>
                    <p className='small-text'>Number of cameras</p>
                    <p className='text'>{numberOfCameras}</p>
                </div>
                <div>
                    <p className='small-text'>Number of videos</p>
                    <p className='text'>{numberOfVideos()}</p>
                </div>
                <div>
                    <p className='small-text'>Number of reports</p>
                    <p className='text'>{numberOfReports()}</p>
                </div>
            </div>
            <div className='pane2'>
                <div>
                    <p className='title'>Chart</p>
                    <Line
                        className='chart'
                        data={{
                            labels: labelChart(),
                            datasets: datasets,
                        }}
                    />
                </div>
                <div>
                    <div>
                        <p className='title'>Male</p>
                        <p className='content'>{numberOfMales()}</p>
                    </div>
                    <div>
                        <p className='title'>Female</p>
                        <p className='content'>{numberOfFemales()}</p>
                    </div>
                    <div>
                        <p className='title'>Age</p>
                        <p className='content'>{averageAge()}</p>
                    </div>
                </div>
            </div>
            <div className='pane3'>
                {table()}

            </div>
        </div>
    )
}
