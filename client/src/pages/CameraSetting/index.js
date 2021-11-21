import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/index.scss";
import CanvasDraw from "react-canvas-draw";
import { getCamera } from '../../graphql/camera';
import { useQuery } from '@apollo/client';
import TimeSlider from "../../components/time-slider";

import Hls from 'hls.js';

export default function CameraStream(props) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const hls = useRef(null);

    const isMounted = useRef(true);
    isMounted.current = true;

    let { id } = useParams();


    useEffect(() => {
        return () => { isMounted.current = false; hls.current?.destroy() }
    }, [])

    const onCompleted = ({ camera }) => {
        let videoSrc = `${process.env.REACT_APP_DOMAIN}\\stream\\${camera._id}\\index.m3u8`;
        const video = videoRef.current;
        if (Hls.isSupported()) {
            hls.current = new Hls();
            hls.current.loadSource(videoSrc);
            hls.current.attachMedia(video);
        }
    }
    const { data } = useQuery(getCamera, {
        variables: {
            _id: id
        },
        skip: id === null,
        onCompleted
    })
    const titles = [{ title: 'name', value: 'camera_name' }, { title: 'uri', value: 'camera_link' }];
    const form = () => {
        return (
            <form className='custom-card form-info' >
                {
                    titles.map((value, index) => {
                        return (
                            <div key={index}>
                                <p className='label'>{value.title}</p>
                                <input type='text' defaultValue={data?.camera[value.value]} />
                            </div>
                        )
                    })
                }
                <div>
                    <p className='label'>Thời gian hoạt động</p>
                    <TimeSlider />
                </div>
                <div>
                    <p className='label'>Thời gian thông báo</p>
                    <TimeSlider />
                </div>
                <div style={{ display: 'flex' }}>
                    <input className='btn btn-primary' type="submit" />
                    <button className='btn btn-warning' onClick={() => canvasRef.current?.clear()}>Clear</button>
                </div>
            </form>
        )
    }

    return (
        <div id="SettingCamera">
            <div className="left-pane">
                <video id="videoWrapper" ref={videoRef} crossOrigin="anonymous" autoPlay />
                <CanvasDraw style={{ width: '95%', height: '90%', backgroundColor: 'transparent' }} brushColor='red' hideGrid={true} ref={canvasRef} className='result-canvas' />
            </div>
            <div className="right-pane">
                <p className='title'>Cài đặt Camera</p>
                {form()}
            </div>
        </div>
    );
}
