import React, { useState } from "react";
import Camera from "./js/Camera";
import Dashboard from './js/Dashboard';
import Video from './js/Video';
import UserInfo from './js/User';
import ListFace from "./js/Face";
import Location from "./js/Location";
import Report from './js/Report'
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
        if (id === 8 && data?.user?._id) {
            logoutUser({
                variables: data?.user?._id,
                refetchQueries: [{ query: getUser }]
            });
            history.replace('/Auth/Login');
        }
        else setSelectedMenu(id);
    }

    const showDashboard = () => {
        const listDashboard = {
            0: <Camera />,
            1: <Video />,
            2: <Report />,
            3: <Dashboard />,
            4: <UserInfo />,
            5: <ListFace />,
            6: <Location />
        }
        return listDashboard[selectedMenu];
    }
    const listMenu = ['Danh sách camera', 'Danh sách video', 'Danh sách report', 'Thống kê', 'Thông tin tài khoản', 'Người quen', 'Địa điểm', 'Cài đặt', 'Trợ giúp', 'Đăng xuất']
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
