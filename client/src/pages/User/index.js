import React, { useState } from "react";
import Camera from "./js/Camera";
import Analytics from './js/Analytics';
import Video from './js/Video';
import UserInfo from './js/User';
import ListFace from "./js/Face";
import "./css/index.scss";
import { IoIosArrowForward } from 'react-icons/io';
import { useQuery, useMutation } from '@apollo/client'
import { getUser, logout } from '../../graphql/user';
import { useHistory } from "react-router-dom";

export default function User(props) {
    const history = useHistory();
    const { loading, error, data } = useQuery(getUser);
    const [logoutUser, logoutMutation] = useMutation(logout)

    const [selectedMenu, setSelectedMenu] = useState(0);

    const handleSelectMenu = (id) => {
        if (id === 7 && data?.user?._id) {
            // logoutUser({
            //     variables: data?.user?._id,
            //     refetchQueries: [{ query: getUser }]
            // });
            history.replace('/Auth/Login');
        }
        else setSelectedMenu(id);
    }

    const showDashboard = () => {
        let videos = [];
        data?.user?.cameras?.forEach(value => {
            videos = [...value.videos, ...videos]
        });
        const listDashboard = {
            0: <Camera data={data?.user?.cameras} />,
            1: <Video data={videos} />,
            2: <Analytics />,
            3: <UserInfo data={data?.user} />,
            4: <ListFace data={data?.user?.faces} />
        }
        return listDashboard[selectedMenu];
    }
    const listMenu = ['Danh sách camera', 'Danh sách video', 'Thống kê', 'Thông tin tài khoản', 'Chia sẻ', 'Cài đặt', 'Trợ giúp', 'Đăng xuất']
    return (
        <div id="User">
            <div className='left-pane'>
                <div className='menu'>
                    {
                        listMenu.map((value, index) => {
                            return (
                                <div key={index} className={'item ' + (selectedMenu === index ? 'selected' : '')} onClick={() => handleSelectMenu(index)}>
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
