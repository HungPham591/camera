import React, { useState } from "react";
import Camera from "./js/Camera";
import Report from './js/Report';
import Video from './js/Video';
import UserInfo from './js/User';
import "./css/index.scss";
import { IoIosArrowForward } from 'react-icons/io';
import { useQuery } from '@apollo/client'
import { getUser } from '../../graphql/user';

export default function User(props) {
    const { loading, error, data } = useQuery(getUser);

    const [selectedMenu, setSelectedMenu] = useState(0);

    const showDashboard = () => {
        let reports = [];
        let videos = [];
        data?.user?.cameras?.forEach(value => {
            reports = [...value.reports, ...reports]
            videos = [...value.videos, ...videos]
        });
        const listDashboard = {
            0: <Camera data={data?.user?.cameras} />,
            1: <Video data={videos} />,
            2: <Report data={reports} />,
            3: <UserInfo data={data?.user} />,
        }
        return listDashboard[selectedMenu];
    }
    const listMenu = ['Danh sách camera', 'Danh sách video', 'Danh sách báo cáo', 'Thông tin tài khoản', 'Camera được chia sẻ', 'Cài đặt', 'Trợ giúp', 'Đăng xuất']
    return (
        <div id="User">
            <div className='left-pane'>
                <div className='menu'>
                    {
                        listMenu.map((value, index) => {
                            return (
                                <div key={index} className={'item ' + (selectedMenu === index ? 'selected' : '')} onClick={() => setSelectedMenu(index)}>
                                    <p>
                                        {value}
                                    </p>
                                    <IoIosArrowForward className='arrow' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='right-pane'>
                {showDashboard()}
            </div>
        </div>
    );
}
