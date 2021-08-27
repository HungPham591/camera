import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SettingModal from "./js/SettingModel";
import ListCamera from "./js/ListCamera";
import Nav from "../share/Nav";
import Footer from "../share/Footer";
import "./css/index.scss";
import imgProfile from './css/profile.png'

export default function User(props) {
    let history = useHistory();
    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const openModal = (id) => {
        handleShow();
    };

    const listMenu = ['Danh sách camera', 'Video của bạn', 'Lịch sử', 'Camera của bạn', 'Camera được chia sẻ', 'Cài đặt', 'Trợ giúp', 'Đăng xuất']
    return (
        <div id="User">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-3 px-0">
                        <div style={{ padding: "2vh 5% 2vh 5%", backgroundColor: "white", minHeight: '92vh' }}>
                            <div className='custom-card'>
                                <img src={imgProfile} />
                                <div className='info'>
                                    <h3>User</h3>
                                    <p>gmail</p>
                                </div>
                            </div>
                            <div style={{ paddingTop: '2vh' }}>
                                {
                                    listMenu.map((value, index) => {
                                        return (
                                            <p className='list-item'>
                                                {value}
                                            </p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 px-0">
                        <div style={{ padding: "2vh 2vw 2vh 2vw", backgroundColor: "#F9F9F9", minHeight: '92vh' }}>
                            <p className='title'>Camera của bạn</p>
                            <div className="row">
                                <ListCamera openModal={openModal} handleClose={handleClose} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SettingModal show={show} handleClose={handleClose} />
        </div>
    );
}
