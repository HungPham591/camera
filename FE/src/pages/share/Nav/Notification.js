import React, { useEffect, useState, memo } from "react";
import { IoIosAlert } from 'react-icons/io';
import { getReport } from '../../../services/report'

function Notification(props) {
    const [listReport, setListReport] = useState([]);

    useEffect(() => {
        fetchReport();
    }, [])
    const fetchReport = async () => {
        const listReport = await getReport();
        setListReport(listReport);
    }

    const listMessage = () => {
        return listReport.map((value, index) => {
            const time = new Date(value.createdAt);
            const year = time.getFullYear();
            const month = time.getMonth();
            const date = time.getDate();
            const hour = time.getHours();
            const minute = time.getMinutes();
            return (
                <div key={index} className='item'>
                    <IoIosAlert className='icon' />
                    <div className='body'>
                        <p className='title'>Notification from camera {value.camera.camera_name}</p>
                        <p className='content'>{date}/{month}/{year} {minute}:{hour}</p>
                    </div>
                </div>
            )
        })
    }
    return (
        <div id='Notification' className={props.show ? '' : 'd-none'}>
            <div className='header'>
                <p className='title'>Notification</p>
                <a>See all</a>
            </div>
            <div className='body'>
                {listMessage()}
            </div>
        </div>
    )
}
export default memo(Notification);