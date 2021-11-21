import React, { useEffect, useState } from 'react';
const { io } = require("socket.io-client");

export default function Toast(props) {
    const [toast, showToast] = useState(false);

    useEffect(() => {
        // console.log(props?.data)
        if (!props?.data?.camera) return;
        showToast(true)
        setTimeout(() => {
            showToast(false)
        }, 5000);
    }, [props?.data])


    return (
        <div id='Toast' className={toast ? '' : 'd-none'}>
            <img src={props?.data?.img} />
            <div>
                <p className='title'>new report</p>
                <p className='content'>giới tính {props?.data?.report_description[0]?.gender}<br></br>tuổi {Math.round(props?.data?.report_description[0]?.age)}</p>
            </div>
        </div>
    )
}