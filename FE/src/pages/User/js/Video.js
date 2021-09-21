import cameraLogo from "../css/camera.jpg";
import { useHistory } from "react-router";

export default function ListCamera(props) {
    let history = useHistory();

    const handleWatchButton = (id) => {
        history.push("/Video/" + id);
    };
    if (!props.data?.length) {
        return (
            <div>
                <p className='title'>Video của bạn</p>
                <h4>No videos</h4>
            </div>
        )
    }
    return (
        <div>
            <p className='title'>Video của bạn</p>
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
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
