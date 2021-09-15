import React, { useRef } from "react";
import { deleteCamera, updateCamera } from "../../../services/camera";

export default function SettingModel(props) {
    const cameraNameRef = useRef(null);
    const cameraLinkRef = useRef(null);
    const cameraLocationRef = useRef(null);
    const cameraPublicRef = useRef(null);

    const handleSaveButton = () => {

    }
    const handleDeleteButton = () => {
        props.deleteCamera(props.camera._id);
        props.handleClose();
    }
    return (
        <div className={'modal ' + (props.show ? '' : 'modal-hide')}>
            <div className='header'>
                <h4 className='title'>Setting</h4>
            </div>
            <div className='body'>
                <p className='label'>Camera name</p>
                <input type='text' value={props.camera?.camera_name} ref={cameraNameRef} />
                <p className='label'>Camera link</p>
                <input type='text' value={props.camera?.camera_link} ref={cameraLinkRef} />
                <p className='label'>Camera location</p>
                <input type='text' value={props.camera?.camera_location} ref={cameraLocationRef} />
                <div style={{ display: 'flex', justifyContent: 'start', width: '100%', alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        name="camera_public"
                        checked={props.camera?.camera_public}
                        ref={cameraPublicRef}
                    />
                    <p className='label-checkbox'>public</p>
                </div>
            </div>
            <div className='footer'>
                <button onClick={handleSaveButton}>Save</button>
                <button onClick={handleDeleteButton}>Delete</button>
                <button onClick={props.handleClose}>Close</button>
            </div>
        </div>
    )
}
