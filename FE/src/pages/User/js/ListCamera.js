import cameraLogo from "../css/camera.jpg";
import { connect } from "react-redux";
import { useEffect } from "react";
import callApi from "../../../api/apiCaller";
import { useState } from "react";
import { useHistory } from "react-router";

function ListCamera(props) {
    let history = useHistory();

    useEffect(() => {
        fetchCamera();
    }, []);

    const [dataCamera, setDataCamera] = useState([]);

    const fetchCamera = async () => {
        let BODY = { user_id: props.user._id };
        let data = await callApi("/camera/", "GET", BODY);
        setDataCamera(data?.data);
    };

    const openStream = (id) => {
        history.push("/Camera/" + id);
    };

    const deleteCamera = async (id) => {
        let BODY = { _id: id };
        let camera = callApi("/camera/", "DELETE", BODY);
        props.handleClose();
    };

    return dataCamera.map((value, index) => {
        if (props.dataCamera !== undefined) {
            return (
                <div key={index} className="card" style={{ width: "96%" }}>
                    <img className="card-img-top" src={cameraLogo} alt="" />
                    <div className="card-body">
                        <h5 class="card-title">{value.camera_id}</h5>
                        <button
                            className="btn btn-primary"
                            onClick={() => openStream(value.camera_id)}
                        >
                            Xem
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => deleteCamera(value.camera_id)}
                            style={{ marginLeft: "2%" }}
                        >
                            Xoa
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => props.openModal(value.camera_id)}
                            style={{ marginLeft: "2%" }}
                        >
                            Cài đặt
                        </button>
                    </div>
                </div>
            );
        }
    });
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(ListCamera);
