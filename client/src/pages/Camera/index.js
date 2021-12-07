import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./css/index.scss";
import { AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp } from 'react-icons/ai';
import { BsArrowDownLeft, BsArrowDownRight, BsArrowUpLeft, BsArrowUpRight, BsArrowCounterclockwise } from 'react-icons/bs'

import { getUser } from '../../graphql/user';
import { getCamera } from '../../graphql/camera';
import { useQuery } from '@apollo/client';

import Hls from 'hls.js';

import * as faceapi from "face-api.js";

export default function CameraStream(props) {
    const numberOfPeople = useRef(null);
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
            if (data?.length && isMounted.current) speak(`${data.length} person appeared`);
            if (numberOfPeople.current?.innerHTML) numberOfPeople.current.innerHTML = data?.length || 0;
            const resizedDetections = faceapi.resizeResults(data, displaySize);
            canvasRef.current?.getContext('2d')?.clearRect(0, 0, displaySize.width, displaySize.height);
            faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        }, 500);
    }
    const speak = (message) => {
        let msg = new SpeechSynthesisUtterance(message);
        let voices = window.speechSynthesis.getVoices();
        msg.voice = voices[0];
        window.speechSynthesis.speak(msg);
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
            <div className="left-pane">
                <video id="videoWrapper" ref={videoRef} onPlay={handleVideoOnPlay} crossOrigin="anonymous" controls autoPlay />
                <canvas ref={canvasRef} className='result-canvas' />
            </div>
            <div className="right-pane">
                <p className='title'>Trực tiếp</p>
                <p className='small-title'>Tên camera</p>
                <p className='small-text'>{data?.camera?.camera_name}</p>
                <p className='small-title'>Số người xuất hiện</p>
                <p ref={numberOfPeople} className='small-text'>0</p>
                <a
                    ref={downloadRef}
                    href="/#"
                    id="download"
                    className="btn btn-primary"
                    onClick={setHref}
                    download="camera"
                >
                    Snapshot
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
        </div >
    );
}

/*
canvas
x=492
y=413

faceapi.js

_height: 488.7532639951035
_width: 501.3050814921979

positions
0: Point {_x: 803.9741873697252, _y: 207.241702

displaysize
{width: 1920, height: 1080}
*/