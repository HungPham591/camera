import { useHistory } from "react-router";
import SettingModal from "./CameraModal";
import { useState } from "react";
import { getUser } from '../../../graphql/user';
import { useQuery } from '@apollo/client'
import { useRef } from "react";
import Hls from 'hls.js';

export default function ListCamera(props) {
    const history = useHistory();
    const refVideo = useRef([]);

    //modal
    const [camera, setCamera] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onCompleted = ({ user }) => {
        user?.cameras?.map((value, index) => {
            let videoSrc = `${process.env.REACT_APP_DOMAIN}\\stream\\${value._id}\\index.m3u8`;
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(refVideo.current[index]);
        })
    }

    const { loading, error, data } = useQuery(getUser, { onCompleted });

    const handleWatchButton = (id) => {
        history.push("/Camera/" + id);
    };
    const handleSettingButton = (camera) => {
        setCamera(camera);
        handleShow();
    }
    const handleCustomButton = (camera) => {
        history.push('/CameraSetting/' + camera._id)
    }
    const listCamera = () => {
        return data?.user?.cameras?.map((value, index) => {
            return (
                <div key={index} className='custom-card'>
                    <video ref={el => refVideo.current[index] = el}></video>
                    <p className='title'>Camera {value.camera_name}</p>
                    <div className='group-button'>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleWatchButton(value._id)}
                        >
                            Xem
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleSettingButton(value)}
                            style={{ marginLeft: "5%" }}
                        >
                            Cài đặt
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleCustomButton(value)}
                            style={{ marginLeft: "5%" }}
                        >
                            Chi tiet
                        </button>
                    </div>

                </div>
            )
        })
    }
    return (
        <div>
            <SettingModal show={show} handleClose={handleClose} camera={camera} />
            <p className='title'>Camera của bạn</p>
            <div className='grid'>
                {listCamera()}
            </div>
        </div>
    )
}
