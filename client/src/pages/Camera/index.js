import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./css/index.scss";
import ListVideo from "./js/ListVideo";
import { AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp } from 'react-icons/ai';
import { BsArrowDownLeft, BsArrowDownRight, BsArrowUpLeft, BsArrowUpRight, BsArrowCounterclockwise } from 'react-icons/bs'

import { getCamera } from '../../graphql/camera';
import { useQuery } from '@apollo/client';

import Hls from 'hls.js';

import * as faceapi from "face-api.js";

export default function CameraStream(props) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const downloadRef = useRef(null);
    const hls = useRef(null);

    const isMounted = useRef(true);
    isMounted.current = true;

    let { id } = useParams();

    useEffect(() => {
        loadModels();
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

    const loadModels = async () => {
        const path = '/models';
        if (!faceapi.nets.tinyFaceDetector.isLoaded || !faceapi.nets.faceLandmark68Net.isLoaded)
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(path),
                faceapi.nets.faceLandmark68Net.loadFromUri(path),
            ])
    }

    const detectAllFaces = () => {
        const displaySize = {
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight,
        }
        faceapi.matchDimensions(canvasRef.current, displaySize);
        let interval = setInterval(async () => {
            if (!isMounted.current || videoRef.current?.paused) return clearInterval(interval);
            const data = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
            if (!data || !isMounted.current) return;
            const resizedDetections = faceapi.resizeResults(data, displaySize);
            canvasRef.current?.getContext('2d')?.clearRect(0, 0, displaySize.width, displaySize.height);
            faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        }, 500);
    }
    const handleVideoOnPlay = () => {
        detectAllFaces();
    }


    const setHref = () => {
        const video = videoRef.current
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const canvasContext = canvas.getContext("2d");
        canvasContext.drawImage(video, 0, 0);
        downloadRef.current.href = canvas.toDataURL('image/png');
    };

    return (
        <div id="Camera">
            <p className='title-1'>Xem trực tiếp</p>
            <div className='custom-container'>
                <div className="left-pane">
                    <video id="videoWrapper" ref={videoRef} onPlay={handleVideoOnPlay} crossOrigin="anonymous" controls autoPlay />
                    <canvas ref={canvasRef} className='result-canvas' />
                </div>
                <div className="right-pane">
                    <p className='title'>Camera {data?.camera?.camera_name}</p>
                    <a
                        ref={downloadRef}
                        href="/#"
                        id="download"
                        className="btn btn-primary"
                        onClick={setHref}
                        download="camera"
                    >
                        Screenshot
                    </a>
                    <div className='control-pane'>
                        <p className='title'>Bảng điều khiển</p>
                        <div className='button-group'>
                            <BsArrowUpLeft />
                            <AiOutlineArrowUp />
                            <BsArrowUpRight />
                            <AiOutlineArrowLeft />
                            <BsArrowCounterclockwise />
                            <AiOutlineArrowRight />
                            <BsArrowDownLeft />
                            <AiOutlineArrowDown />
                            <BsArrowDownRight />
                        </div>
                    </div>
                </div>
            </div>
            <p style={{ marginLeft: '1%', fontWeight: 500, fontSize: '1.5rem', marginBottom: '10px' }}>List video</p>
            <ListVideo videos={data?.camera?.videos} camera={data?.camera?._id} />
        </div>
    );
}
