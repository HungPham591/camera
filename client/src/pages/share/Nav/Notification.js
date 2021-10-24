import React, { useEffect, useState, memo } from "react";
import { IoIosAlert } from 'react-icons/io';
import { useQuery } from '@apollo/client'
import { getUser } from '../../../graphql/user';

function Notification(props) {
    // const { loading, error, data } = useQuery(getUser, { pollInterval: 1000 });
    const { loading, error, data } = useQuery(getUser);

    Date.prototype.formatMMDDYYYY = function () {
        return this.getDate() +
            "/" + (this.getMonth() + 1) +
            "/" + this.getFullYear();
    }
    Date.prototype.formatHHmm = function () {
        return this.getHours() + ':' + this.getMinutes();
    }

    const listMessage = () => {
        return data?.user?.cameras?.map((camera, index) => {
            return camera.reports?.map((report, index) => {
                if (index > 4) return;
                const time = new Date(report.createdAt);
                return (
                    <div key={index} className='item'>
                        <IoIosAlert className='icon' />
                        <div className='body'>
                            <p className='title'>Notification from camera {camera.camera_name}</p>
                            <p className='content'>{new Date(time).formatMMDDYYYY()} {new Date(time).formatHHmm()}</p>
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