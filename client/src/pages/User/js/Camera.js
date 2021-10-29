import cameraLogo from "../css/camera.jpg";
import { useHistory } from "react-router";
import SettingModal from "./CameraModal";
import { useState } from "react";

export default function ListCamera(props) {
    let history = useHistory();

    //modal
    const [camera, setCamera] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleWatchButton = (id) => {
        history.push("/Camera/" + id);
    };
    const handleSettingButton = (camera) => {
        setCamera(camera);
        handleShow();
    }
    if (!props.data?.length) {
        return (
            <div>
                <p className='title'>Camera của bạn</p>
                <h4>No camera</h4>
            </div>
        )
    }
    return (
        <div>
            <SettingModal show={show} handleClose={handleClose} camera={camera} />
            <p className='title'>Camera của bạn</p>
            <div className='grid'>
                {
                    props.data.map((value, index) => {
                        return (
                            <div key={index} className='custom-card'>
                                <img src={cameraLogo} />
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
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
