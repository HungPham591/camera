import React from "react";
import moment from 'moment';

export default function ReportModal(props) {
    const imgUri = `${process.env.REACT_APP_DOMAIN}\\${props?.user?._id}\\${props?.report?.camera?._id}\\report\\${props?.report?._id}.png`;
    return (
        <form className={'modal ' + (props.show ? '' : 'modal-hide')}>
            <div className='header'>
                <h4 className='title'>Report</h4>
            </div>
            <div className='body'>
                <label className='label'>Camera name</label>
                <input type='text' defaultValue={props?.report?.camera?.camera_name} />
                <label className='label'>Report time</label>
                <input type='text' defaultValue={moment(props?.report?.createdAt).format('DD/MM/YYYY HH:mm')} />
                <img src={imgUri} />
            </div>
            <div className='footer'>
                <button type='button' onClick={props.handleClose}>Close</button>
            </div>
        </form>
    )
}
