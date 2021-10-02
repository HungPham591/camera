import React, { useEffect, useState, memo } from 'react';
import { connect } from "react-redux";

function Toast(props) {
    const [notification, setNotification] = useState(null);
    const [toast, showToast] = useState(false);

    useEffect(() => {
        if (notification?._id) {
            showToast(true)
            setTimeout(() => {
                showToast(false)
            }, 3000);
        }
    }, [notification])


    useEffect(() => {
        getNotification()
    }, [props.user])
    const getNotification = () => {
        if (!props.user?._id) return;
        const ws = new WebSocket(`ws://localhost:15000`)
        ws.onmessage = (e) => {
            let { data } = e;
            data = JSON.parse(data);
            setNotification(data);
        }
    }
    return (
        <div id='Toast' className={toast ? '' : 'd-none'}>
            <p className='title'>{notification?._id}</p>
            <p className='content'>{notification?.description}</p>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default memo(connect(mapStateToProps)(Toast));