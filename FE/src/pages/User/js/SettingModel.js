import { Modal } from "react-bootstrap";
import React from "react";

export default function SettingModel(props) {
    return (
        <div className={'modal ' + (props.show ? '' : 'modal-hide')}>
            <div className='header'>
                <h4 className='title'>Setting</h4>
            </div>
            <div className='body'>
                <p className='label'>Camera name</p>
                <input type='text' placeholder='enter camera name' />
                <p className='label'>Camera link</p>
                <input type='text' placeholder='enter camera link' />
                <p className='label'>Camera location</p>
                <input type='text' placeholder='enter camera location' />
                <div style={{ display: 'flex', justifyContent: 'start', width: '100%', alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        name="camera_public"
                    />
                    <p className='label-checkbox'>public</p>
                </div>
            </div>
            <div className='footer'>
                <button>Save</button>
                <button onClick={props.handleClose}>Close</button>
            </div>
        </div>
    )
}
