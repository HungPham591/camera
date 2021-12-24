import { Line } from 'react-chartjs-2';
import { useState } from "react";
import { useQuery } from '@apollo/client';
import { getUser } from '../../../graphql/user';
import moment from 'moment';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ListCamera(props) {
    const currentDate = new Date()

    const [startDate, setStartDate] = useState(currentDate.setFullYear(currentDate.getFullYear() - 1));
    const [endDate, setEndDate] = useState(new Date());

    const { loading, error, data } = useQuery(getUser);

    const [location, setLocation] = useState(0);



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
            camera?.reports?.forEach(report => rs.push(moment(report?.createdAt).format('HH:mm')))
        })
        return rs;
    }
    const datasets = [{
        label: 'Number of peoples per report',
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

    const handleDropdown = (e) => {
        setLocation(e.target.value);
    }
    const dropdown = () => {
        const listOption = data?.user?.locations?.map((value, index) => {
            return <option key={index} value={value._id}>Camera ở {value.location_name}</option>
        })
        return (
            <select onChange={handleDropdown}>
                <option value={0}>Tất cả khu vực</option>
                {listOption}
            </select>
        );
    }
    const table = () => {
        return (
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Camera</th>
                        <th scope="col">Total</th>
                        <th scope="col">Male</th>
                        <th scope="col">Female</th>
                        <th scope="col">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                            </div></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.user?.cameras?.map((camera, index) => {
                            if (location != 0 && camera?.location !== location) return;
                            let human = 0;
                            let male = 0;
                            let female = 0;
                            camera.reports?.forEach(report => {
                                const date1 = moment(report?.createdAt)
                                const date2 = moment(startDate);
                                const date3 = moment(endDate)
                                if (date1 < date2 || date1 > date3) return;
                                male += report?.report_description?.filter(item => item?.gender === 'male').length || 0;
                                female += report?.report_description?.filter(item => item?.gender === 'female').length || 0;
                            })
                            human = male + female;
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{camera?.camera_name}</td>
                                    <td>{human}</td>
                                    <td>{male}</td>
                                    <td>{female}</td>
                                    <td>{moment(camera?.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                                </tr>
                            )
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
                {dropdown()}
                {table()}

            </div>
        </div>
    )
}
