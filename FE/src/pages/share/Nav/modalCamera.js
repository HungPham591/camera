import { Modal, Button } from "react-bootstrap";
import callApi from "../../../api/apiCaller";
import { connect } from "react-redux";
import { useState } from "react";
import { createCamera } from '../../../services/camera'

function ModalCamera(props) {
    const [data, setData] = useState({ camera_public: false })
    // let data = { camera_public: false };
    const onChange = (e) => {
        let newData = data;

        let target = e.target;
        let name = target.name;
        let value = target.value;
        if (target.type === "checkbox") value = target.checked;

        newData[name] = value

        setData(newData)
    };

    const submitCamera = () => {
        let { camera_link, camera_public, camera_name } = data;
        let BODY = {
            camera_name: camera_name,
            camera_link: camera_link,
            camera_location: props.location,
            camera_public: camera_public,
        };
        createCamera(BODY)
        props.handleCloseCamera();
        setData({ camera_public: false })
    };
    return (
        <Modal
            show={props.showCamera}
            onHide={props.handleCloseCamera}
            style={{ zIndex: 9999 }}
        >
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Camera</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Link</label>
                        <input
                            className="form-control"
                            name="camera_link"
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Camera name</label>
                        <input
                            className="form-control"
                            name="camera_name"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="camera_public"
                            onChange={onChange}
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            Public
                        </label>
                    </div>
                </Modal.Body>
            </div>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseCamera}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitCamera}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        location: state.location
    };
};

export default connect(mapStateToProps)(ModalCamera);
