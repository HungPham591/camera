import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { BsFillPersonFill, BsFillPlusCircleFill } from "react-icons/bs";
import { RiNotificationFill } from 'react-icons/ri'
import "./index.scss";
import ModalCamera from "./ModalCamera";
import Notification from "./Notification";
// import Toast from "./Toast";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { getUser } from '../../../graphql/user';

function NavBar(props) {
    const { loading, error, data } = useQuery(getUser);
    console.log(error)

    const location = useLocation();
    const history = useHistory();

    const [nav, showNav] = useState(true);
    const [notification, showNotification] = useState(false);
    const [toast, showToast] = useState(false);

    //camera
    const [showCamera, setShowCamera] = useState(false);
    const handleCloseCamera = () => setShowCamera(false);
    const handleShowCamera = () => setShowCamera(true);

    const handleScroll = () => {
        if (window.pageYOffset > 10)
            showNav(false)
        else
            showNav(true)
    };

    useState(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])
    const checkAtHome = () => {
        const path = location.pathname;
        if (path === '/')
            return true
        return false
    }
    const handleShowNoti = () => {
        showNotification(!notification);
    }
    const handleAddCamera = () => {
        if (!data?.user?._id) {
            return history.push('/Auth/Login')
        }
        handleShowCamera()
    }
    const listNav = [{ name: 'Home', path: '' }, { name: 'Map', path: 'Map' }, { name: 'Video', path: 'Video' }]
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
                    <Link to="/User" id='email' className={data?.user?.user_gmail ? '' : 'd-none'}>
                        {data?.user?.user_gmail}
                    </Link>
                    <Link to="Auth/Login">
                        <BsFillPersonFill />
                    </Link>
                    <RiNotificationFill onClick={handleShowNoti} />
                    <BsFillPlusCircleFill onClick={handleAddCamera} />
                </div>
            </div>
            <ModalCamera
                showCamera={showCamera}
                handleCloseCamera={handleCloseCamera}
            />
            <Notification show={notification} />
            {/* <Toast toast={toast} showToast={showToast} /> */}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        location: state.location,
    };
};

export default connect(mapStateToProps)(NavBar);
