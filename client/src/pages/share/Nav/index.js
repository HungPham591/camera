import React, { useRef, useState } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { BsFillPersonFill, BsFillPlusCircleFill } from "react-icons/bs";
import { RiNotificationFill } from 'react-icons/ri'
import "./index.scss";
import ModalCamera from "./ModalCamera";
import Notification from "./Notification";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { getUser } from '../../../graphql/user';
const { io } = require("socket.io-client");

export default function NavBar(props) {
    const [toast, setToast] = useState(null);

    const onCompleted = ({ user }) => {
        if (!user) return;
        const socket = io("http://localhost:4007/");
        socket.emit('join', user._id);
        socket.on('notification', function (data) {
            setToast(data);
            setTimeout(() => {
                setToast(null);
            }, 5000);
        })
    }

    const { loading, error, data } = useQuery(getUser, { onCompleted });

    const location = useLocation();
    const history = useHistory();

    const [nav, showNav] = useState(true);
    const [notification, showNotification] = useState(false);

    //camera
    const [showCamera, setShowCamera] = useState(false);
    const handleCloseCamera = () => setShowCamera(false);
    const handleShowCamera = () => setShowCamera(true);

    const handleScroll = () => {
        if (window.pageYOffset > 10) showNav(false)
        else showNav(true)
    };

    useState(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])
    const checkAtHome = () => {
        const path = location.pathname;
        if (path === '/') return true
        return false
    }
    const handleShowNoti = () => {
        showNotification(!notification);
    }
    const handleAddCamera = () => {
        if (!data?.user?._id) return history.push('/Auth/Login');
        handleShowCamera()
    }
    const listNav = [{ name: 'Home', path: '' }, { name: 'Map', path: 'Map' }, { name: 'Blog', path: 'Blog' }]
    return (
        <>
            <div className={'Nav ' + (nav && checkAtHome() ? '' : 'Nav-Active')}>
                <div className="left-nav">
                    {
                        listNav.map((value, index) => {
                            return (
                                <NavLink key={index} exact to={'/' + value.path} activeClassName="active">
                                    {value.name}
                                </NavLink>
                            )
                        })
                    }
                </div>

                <div className="right-nav">
                    <Link to="/User" id='email' className={data?.user?.user_name ? '' : 'd-none'}>
                        {data?.user?.user_name}
                    </Link>
                    <Link to="/Auth/Login">
                        <BsFillPersonFill />
                    </Link>
                    <RiNotificationFill onClick={handleShowNoti} />
                    <BsFillPlusCircleFill onClick={handleAddCamera} />
                </div>
            </div>
            <ModalCamera
                showCamera={showCamera}
                handleCloseCamera={handleCloseCamera}
                google_token={data?.user?.google_token}
            />
            <Notification show={notification} />

            <div id='Toast' className={toast ? '' : 'd-none'}>
                <img src={toast?.img} />
                <div>
                    <p className='title'>new report</p>
                    <p className='content'>giới tính {toast?.report_description[0]?.gender}<br></br>tuổi {Math.round(toast?.report_description[0]?.age)}</p>
                </div>
            </div>
        </>
    );
}