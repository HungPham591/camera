import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";
import "./index.scss";
import ModalCamera from "./modalCamera";

function NavBar(props) {
    const [nav, showNav] = useState(true)

    const handleScroll = () => {
        if (window.pageYOffset > 10)
            showNav(false)
        else
            showNav(true)
    };

    useState(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])
    //camera
    const [showCamera, setShowCamera] = useState(false);
    const handleCloseCamera = () => setShowCamera(false);
    const handleShowCamera = () => setShowCamera(true);

    const logginButton = () => {
        let tag = [];
        if (props.user._id !== -1) {
            tag.push(
                <Link
                    to="/User"
                    style={{
                        margin: 'auto 3vw auto 0'
                    }}
                >
                    {props.user.user_gmail}
                </Link>
            );
        }
        tag.push(
            <Link
                to="/Login"
                style={{
                    marginRight: "3vw",
                    fontSize: "1.5rem",
                }}
            >
                <BsFillPersonFill />
            </Link>
        );
        return tag;
    };
    const listNav = [{ name: 'Home', path: '' }, { name: 'Map', path: 'Map' }, { name: 'User', path: 'User' }]
    return (
        <>
            <div id={nav && props.nav ? 'Nav' : 'Nav-Active'}>
                <div className="row left-nav">
                    {listNav.map((value, index) => {
                        return (
                            <NavLink to={'/' + value.path} activeClassName="active">
                                {value.name}
                            </NavLink>
                        )
                    })}
                </div>

                <div className="row right-nav">
                    {logginButton()}
                    <a
                        href=""
                        onClick={(e) => { handleShowCamera(); e.preventDefault() }}
                        style={{
                            fontSize: "1.5rem",
                        }}
                    >
                        <BsFillPlusCircleFill />
                    </a>
                </div>
            </div>
            <ModalCamera
                showCamera={showCamera}
                handleCloseCamera={handleCloseCamera}
            />
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
