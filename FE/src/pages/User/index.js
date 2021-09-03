import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SettingModal from "./js/SettingModel";
import ListCamera from "./js/ListCamera";
import "./css/index.scss";
import imgProfile from './css/profile.png'

export default function User(props) {
    let history = useHistory();
    //modal
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const listMenu = ['Danh sách camera', 'Video của bạn', 'Lịch sử', 'Camera của bạn', 'Camera được chia sẻ', 'Cài đặt', 'Trợ giúp', 'Đăng xuất']
    return (
        <div id="User">
            <div className='left-pane'>
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
                                <p key={index} className='list-item'>
                                    {value}
                                </p>
                            )
                        })
                    }
                </div>
            </div>
            <div className='right-pane'>
                <p className='title' onClick={handleShow}>Camera của bạn</p>
                {/* <ListCamera openModal={openModal} handleClose={handleClose} /> */}
            </div>
            <SettingModal show={show} handleClose={handleClose} />
        </div>
    );
}
