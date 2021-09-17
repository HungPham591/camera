import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SettingModal from "./js/SettingModel";
import ListCamera from "./js/ListCamera";
import "./css/index.scss";
import { getCameraByUser } from "../../services/camera";
import { IoIosArrowForward } from 'react-icons/io';

export default function User(props) {
    let history = useHistory();

    const [selectedMenu, setSelectedMenu] = useState(0);

    const [dataCamera, setDataCamera] = useState([]);
    //modal
    const [camera, setCamera] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        fetchCamera();
    }, []);
    const fetchCamera = async () => {
        let cameras = await getCameraByUser();
        setDataCamera(cameras);
    };
    const deleteCamera = (id) => {
        const listCamera = dataCamera.filter(camera => camera._id !== id);
        setDataCamera(listCamera);
    }
    const updateCamera = (camera) => {
        const listCamera = dataCamera.map(item => {
            if (item._id !== camera) return item;
            return camera;
        })
        setDataCamera(listCamera);
    }

    const listMenu = ['Danh sách camera', 'Video của bạn', 'Lịch sử', 'Camera của bạn', 'Camera được chia sẻ', 'Cài đặt', 'Trợ giúp', 'Đăng xuất']
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
                <ListCamera openModal={handleShow} setCamera={setCamera} dataCamera={dataCamera} />
            </div>
            <SettingModal show={show} handleClose={handleClose} camera={camera} deleteCamera={deleteCamera} updateCamera={updateCamera} />
        </div>
    );
}
