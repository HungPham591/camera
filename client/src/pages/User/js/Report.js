import { useHistory } from "react-router";
import SettingModal from "./ReportModal";
import { useState, useEffect } from "react";
import { getUser } from '../../../graphql/user';
import { useQuery } from '@apollo/client'
import { useRef } from "react";
import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ListReport(props) {
    const currentDate = new Date()

    const [startDate, setStartDate] = useState(currentDate.setFullYear(currentDate.getFullYear() - 1));
    const [endDate, setEndDate] = useState(new Date());

    const [cameraState, setCamera] = useState(null);
    //modal
    const [report, setReport] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onCompleted = ({ user }) => {
        if (!user?.cameras?.length) return;
        setCamera(user?.cameras[0]?._id)
        setReport(user?.reports);
    }

    useEffect(() => {
        if (!cameraState && data?.user?.cameras?.length) setCamera(data?.user?.cameras[0]?._id);
    }, [])

    const { loading, error, data } = useQuery(getUser, { onCompleted });


    const handleRowClick = (report, camera) => {
        const reportData = { ...report, camera, user: data?.user }
        setReport(reportData);
        handleShow();
    }
    const handleDropdown = (e) => {
        setCamera(e.target.value);
    }
    const dropdown = () => {
        const listOption = data?.user?.cameras?.map((value, index) => {
            return <option key={index} value={value._id}>Report ở camera {value.camera_name}</option>
        })
        return (
            <select onChange={handleDropdown}>
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
                        <th scope="col">Total</th>
                        <th scope="col">Male</th>
                        <th scope="col">Female</th>
                        <th scope="col">Age</th>
                        <th scope="col">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.user?.cameras?.map((camera, index) => {
                            if (camera._id !== cameraState) return;
                            return camera.reports?.map((report, index) => {
                                const date1 = moment(report?.createdAt)
                                const date2 = moment(startDate);
                                const date3 = moment(endDate)
                                if (date1 < date2 || date1 > date3) return;
                                const male = report?.report_description?.filter(item => item?.gender === 'male').length || 0;
                                const female = report?.report_description?.filter(item => item?.gender === 'female').length || 0;
                                const total = male + female;
                                let age = report?.report_description?.reduce(((pre, cur) => pre + cur.age), 0);
                                age = age / (report?.report_description?.length || 1);
                                age = Math.round(age / report?.report_description?.length)
                                return (
                                    <tr key={index} onClick={() => handleRowClick(report, camera)}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{total}</td>
                                        <td>{male}</td>
                                        <td>{female}</td>
                                        <td>{age}</td>
                                        <td>{moment(report?.createdAt).format('DD/MM/YYYY HH:mm')}</td>
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
        <div>
            <SettingModal show={show} handleClose={handleClose} report={report} />
            <p className='title'>Report của bạn</p>
            {dropdown()}
            <div className='pane'>
                {table()}
            </div>
        </div>
    )
}
