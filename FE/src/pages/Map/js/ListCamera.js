import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCamera } from '../../../services/camera'

export default function ListCamera(props) {
    const [dataCamera, setDataCamera] = useState([]);

    useEffect(() => {
        fetchCamera();
    }, []);
    const fetchCamera = async () => {
        let listCamera = await getCamera({});
        setDataCamera(listCamera)
    };
    let history = useHistory();
    const openStream = (_id) => {
        history.push("/Camera/" + _id);
    };
    if (dataCamera.length === 0)
        return <h4>Chưa có camera</h4>;
    return dataCamera.map((value, index) => {
        let imgUri = `${process.env.REACT_APP_DOMAIN}\\current\\${value._id}.png`;
        return (
            <div key={index} className="custom-card">
                <img src={imgUri} alt="" />
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
}
