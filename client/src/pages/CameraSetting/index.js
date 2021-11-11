import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./css/index.scss";
import CanvasDraw from "react-canvas-draw";
import { getCamera } from '../../graphql/camera';
import { useQuery } from '@apollo/client';

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
    const titles = [{ title: 'name', value: 'camera_name' }, { title: 'uri', value: 'camera_uri' }];
    const form = () => {
        return (
            <form className='custom-card form-info' >
                {
                    titles.map((value, index) => {
                        return (
                            <div key={index}>
                                <p className='label'>{value.title}</p>
                                <input type='text' />
                            </div>
                        )
                    })
                }
                <input type="submit" />
            </form>
        )
    }

    return (
        <div id="SettingCamera">
            <div className="left-pane">
                <video id="videoWrapper" ref={videoRef} crossOrigin="anonymous" autoPlay />
                <CanvasDraw style={{ width: '97%', height: '80%', backgroundColor: 'transparent' }} hideGrid={true} ref={canvasRef} className='result-canvas' />
                <button className="btn btn-primary" style={{ bottom: 30, left: 10 }}>clear</button>
            </div>
            <div className="right-pane">
                <p className='title'>Camera Setting</p>
                {form()}
            </div>
        </div>
    );
}
