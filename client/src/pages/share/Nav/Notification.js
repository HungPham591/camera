import React, { useEffect, useState, memo } from "react";
import { IoIosAlert } from 'react-icons/io';
import { useQuery } from '@apollo/client'
import { getUser } from '../../../graphql/user';
import moment from 'moment';

function Notification(props) {
    // const { loading, error, data } = useQuery(getUser, { pollInterval: 1000 });
    const { loading, error, data } = useQuery(getUser);

    const listMessage = () => {
        const listMessage = data?.user?.cameras?.map((camera, index) => {
            return camera.reports?.map((report, index) => {
                return (
                    <div key={index} className='item'>
                        <IoIosAlert className='icon' />
                        <div className='body'>
                            <p className='title'>Thông báo đến từ {camera.camera_name}</p>
                            <p className='content'>{moment(report.createdAt).format('HH:mm DD/MM/YYYY')}</p>
                        </div>
                    </div>
                )
            })
        })
        return listMessage?.slice(0, 3)
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