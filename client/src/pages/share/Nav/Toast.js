import React, { useEffect, useState } from 'react';
const { io } = require("socket.io-client");

export default function Toast(props) {
    const [toast, showToast] = useState(false);

    useEffect(() => {
        if (!props?.data?.camera) return;
        showToast(true)
        setTimeout(() => {
            showToast(false)
        }, 5000);
    }, [props?.data])


    return (
        <div id='Toast' className={toast ? '' : 'd-none'}>
            <img src={props?.data?.img} />
            <p className='title'>new port</p>
            <p className='content'>{props?.data?.description}</p>
        </div>
    )
}