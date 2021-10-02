import React, { useEffect, useState, memo } from "react";
import { IoIosAlert } from 'react-icons/io';
import { getReport } from '../../../services/report'
import { useQuery } from '@apollo/client'
import { getUser } from '../../../graphql/user';

function Notification(props) {
    // const { loading, error, data } = useQuery(getUser, { pollInterval: 1000 });
    const { loading, error, data } = useQuery(getUser);

    const listMessage = () => {
        return data?.user?.cameras?.map((camera, index) => {
            return camera.reports?.map((report, index) => {
                if (index > 4) return;
                const time = new Date(report.createdAt);
                const year = time.getFullYear();
                const month = time.getMonth();
                const date = time.getDate();
                const hour = time.getHours();
                const minute = time.getMinutes();
                return (
                    <div key={index} className='item'>
                        <IoIosAlert className='icon' />
                        <div className='body'>
                            <p className='title'>Notification from camera {camera.camera_name}</p>
                            <p className='content'>{date}/{month}/{year} {minute}:{hour}</p>
                        </div>
                    </div>
                )
            })
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