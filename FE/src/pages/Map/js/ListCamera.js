import cameraLogo from "../../../camera.jpg";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import callApi from "../../../api/apiCaller";

export default function ListCamera(props) {
    const [dataCamera, setDataCamera] = useState([]);
    useEffect(() => {
        fetchCamera();
    }, []);
    const fetchCamera = async () => {
        let listCamera = await callApi("/camera/", "GET", null);
        setDataCamera(listCamera.data);
    };
    let history = useHistory();
    const openStream = (_id) => {
        history.push("/Camera/" + _id);
    };
    if (dataCamera !== undefined) {
        return dataCamera.map((value, index) => {
            return (
                <div key={index} className="custom-card">
                    <img className="card-img-top" src={cameraLogo} alt="" />
                    <div className="card-body">
                        <h5 class="card-title">Camera {value.camera_name}</h5>
                        <button
                            className="btn btn-primary"
                            onClick={() => openStream(value._id)}
                        >
                            Xem
                        </button>
                    </div>
                </div>
            );
        });
    } else {
        return <h4>Chua co camera</h4>;
    }
}
