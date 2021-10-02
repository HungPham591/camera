import cameraLogo from "../css/camera.jpg";
import { useHistory } from "react-router";

export default function ListCamera(props) {
    let history = useHistory();

    if (!props.data?.length) {
        return (
            <div>
                <p className='title'>Report của bạn</p>
                <h4>No report</h4>
            </div>
        )
    }
    return (
        <div>
            <p className='title'>Report của bạn</p>
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
