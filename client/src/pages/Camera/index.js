import React, { useEffect, useRef } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import { useParams } from "react-router-dom";
import "./css/index.scss";
import ListVideo from "./js/ListVideo";
import { AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp } from 'react-icons/ai';
import { BsArrowDownLeft, BsArrowDownRight, BsArrowUpLeft, BsArrowUpRight, BsArrowCounterclockwise } from 'react-icons/bs'

import { getCamera } from '../../graphql/camera';
import { useQuery } from '@apollo/client';

import * as faceapi from "face-api.js";

export default function CameraStream(props) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const downloadRef = useRef(null);

    const isMounted = useRef(true);

    let { id } = useParams();
    let video;
    let port = 0;
    for (let i = 0; i < id.length; i++) {
        port += id.charCodeAt(i)
    }
    const { loading, error, data } = useQuery(getCamera, {
        variables: {
            _id: id
        },
        skip: id === null
    })

    const loadModels = async () => {
        const path = '/models';
        if (!faceapi.nets.tinyFaceDetector.isLoaded || !faceapi.nets.faceLandmark68Net.isLoaded)
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(path),
                faceapi.nets.faceLandmark68Net.loadFromUri(path),
            ])
        detectAllFaces();
    }

    const detectAllFaces = () => {
        const displaySize = {
            width: videoRef.current.width,
            height: videoRef.current.height,
        }
        faceapi.matchDimensions(canvasRef.current, displaySize);
        let interval = setInterval(() => {
            if (!isMounted.current) return clearInterval(interval);
            const data = videoRef.current?.toDataURL('image/jpeg', 1.0);
            const img = new Image();
            img.src = data;
            faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions)
                .withFaceLandmarks()
                .then(data => {
                    if (!data || !isMounted.current) return;
                    const resizedDetections = faceapi.resizeResults(data, displaySize);
                    canvasRef.current?.getContext('2d')?.clearRect(0, 0, displaySize.width, displaySize.height);
                    if (!canvasRef.current?.getContext('2d')) return;
                    faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                });
        }, 500);
    }

    useEffect(() => {
        loadModels();
        video = new JSMpeg.VideoElement(
            "#videoWrapper",
            "ws://localhost:" + (9999 + port),
            { canvas: videoRef.current },
            { preserveDrawingBuffer: true }
        );
        return () => {
            video.destroy();
            isMounted.current = false;
        }
    }, []);

    const setHref = () => {
        downloadRef.current.href = canvasRef.current.toDataURL();
    };

    return (
        <div id="Camera">
            <p className='title-1'>Xem trực tiếp</p>
            <div className='custom-container'>
                <div className="left-pane">
                    <canvas id="videoWrapper" ref={videoRef} />
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
