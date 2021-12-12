import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/index.scss";
import CanvasDraw from "react-canvas-draw";
import { getCamera, updateCamera } from '../../graphql/camera';
import { useQuery, useMutation } from '@apollo/client';
import TimeSlider from "../../components/time-slider";
import { useForm } from 'react-hook-form';
import Hls from 'hls.js';

export default function CameraStream(props) {
    const workTimeSlider = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const hls = useRef(null);

    const [updateItem, updateMutation] = useMutation(updateCamera)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const isMounted = useRef(true);
    isMounted.current = true;

    let { id } = useParams();

    useEffect(() => {
        return () => { isMounted.current = false; hls.current?.destroy() }
    }, [])

    const onCompleted = ({ camera }) => {
        // workTimeSlider.current.state.selectedInterval = camera?.working_time;
        // canvasRef.current.loadSaveData(camera?.detect_zone.toString(), true);

        let videoSrc = `${process.env.REACT_APP_DOMAIN}\\${camera.user}\\${camera._id}\\stream\\index.m3u8`;
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
    const onSubmit = () => {
        let BODY = {
            ...data.camera,
            working_time: workTimeSlider.current?.state?.selectedInterval,
            detect_zone: JSON.parse(canvasRef.current.getSaveData())?.lines[0]?.points,
        }
        console.log(BODY)
        updateItem({ variables: BODY })
    }
    const titles = [{ title: 'name', value: 'camera_name' }, { title: 'uri', value: 'camera_link' }];
    const form = () => {
        return (
            <form className='custom-card form-info' onSubmit={handleSubmit(onSubmit)}>
                {
                    titles.map((value, index) => {
                        return (
                            <div key={index}>
                                <p className='label'>{value.title}</p>
                                <input type='text' defaultValue={data?.camera[value.value]} disabled />
                            </div>
                        )
                    })
                }
                <div>
                    <p className='label'>Thời gian hoạt động</p>
                    <TimeSlider ref={workTimeSlider} />
                </div>
                <div>
                    <p className='label'>Thời gian thông báo</p>
                    <TimeSlider />
                </div>
                <div style={{ display: 'flex' }}>
                    <input className='btn btn-primary' type="submit" />
                    <button className='btn btn-warning' type='button' onClick={() => canvasRef.current?.clear()}>Clear</button>
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
