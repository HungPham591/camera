import cameraLogo from "../css/camera.jpg";
import { useHistory } from "react-router";

export default function ListCamera(props) {
    let history = useHistory();

    const openStream = (id) => {
        history.push("/Camera/" + id);
    };
    const handleSettingButton = (camera) => {
        props.setCamera(camera);
        props.openModal();
    }
    if (!props.dataCamera?.length) {
        return (
            <div>
                <p className='title'>Camera của bạn</p>
                <h4>No camera</h4>
            </div>
        )
    }
    return (
        <div>
            <p className='title'>Camera của bạn</p>
            <div className='grid'>
                {
                    props.dataCamera.map((value, index) => {
                        return (
                            <div key={index} className='custom-card'>
                                <img src={cameraLogo} />
                                <p className='title'>Camera {value.camera_name}</p>
                                <div className='group-button'>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => openStream(value._id)}
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
