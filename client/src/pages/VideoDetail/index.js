import React, { useState, useEffect, useRef } from "react";
import Dropzone from 'react-dropzone'
import { useParams } from "react-router-dom";
import "./css/index.scss";
import * as faceapi from "face-api.js";
import { useQuery } from '@apollo/client'
import { getVideo } from '../../graphql/video'

export default function Video(props) {
    const { id } = useParams();
    const videoRef = useRef(null);
    const [timeVideo, setTimeVideo] = useState(false);
    const [environment, setEnvironment] = useState(false);
    const [file, setFile] = useState(null);

    const { loading, error, data } = useQuery(getVideo, {
        variables: {
            _id: id,
        },
        skip: id === null
    });

    const video_path = `${process.env.REACT_APP_DOMAIN}\\video\\${data?.video?.camera?._id}_${data?.video?.video_time}`;
    console.log(video_path)

    const start = data?.video?.createdAt;
    let end = start + 60 * 1000;
    Date.prototype.formatMMDDYYYY = function () {
        return this.getDate() +
            "/" + (this.getMonth() + 1) +
            "/" + this.getFullYear();
    }

    useEffect(() => {
        loadModels();
        checkLoadComplete();
    })

    const handleOnDrop = (file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file[0]);
        reader.onload = () => {
            setFile(reader.result)
        };
    }
    const checkLoadComplete = () => {
        const video = videoRef.current;
        video.addEventListener('loadeddata', async () => {
            const videoTime = Math.round(video.duration);
            setTimeVideo(videoTime);
        })
    }

    const loadModels = async () => {
        const path = '/models';
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(path),
            faceapi.nets.faceLandmark68Net.loadFromUri(path),
            faceapi.nets.faceRecognitionNet.loadFromUri(path),
            faceapi.nets.faceExpressionNet.loadFromUri(path)
        ])
        setEnvironment(true);
    }
    const detectFaceFromVideo = async () => {
        const video = videoRef.current;
        let seekResolve;
        video.addEventListener('seeked', async function () {
            if (seekResolve) seekResolve();
        });
        let currentTime = 0;
        while (currentTime < timeVideo) {
            video.currentTime = currentTime;
            await new Promise(r => seekResolve = r)
            await detectFace()
            currentTime += 1
        }
    }
    const detectFace = async () => {
        let video = videoRef.current;
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions).withFaceLandmarks().withFaceExpressions();
    }
    const progressbar = () => {
        if (!data?.video?.createdAt) return;
        return (
            <ul className="progressbar">
                <li style={{ left: 0 }}></li>
                <p style={{ left: 0 }}>{new Date(start).formatMMDDYYYY()}</p>
                {
                    data?.video?.camera?.reports?.map((value, index) => {
                        if (value.createdAt < start || value.createdAt > end) return;
                        let time = value.createdAt;
                        const point = (time - start) / (end - start);
                        const day = new Date(time).formatMMDDYYYY();
                        time = new Date(time);
                        return (
                            <>
                                <li key={index} style={{ left: `${point}%` }}></li>
                                <p>{day}</p>
                            </>
                        )
                    })
                }
                <li style={{ right: 0 }}></li>
                <p style={{ right: 0 }}>{new Date(end).formatMMDDYYYY()}</p>
            </ul >
        )
    }


    return (
        <div id="VideoDetail">
            <p className='title-1'>Xem lại</p>
            <div className='custom-container'>
                <div className="left-pane">
                    <video ref={videoRef} src={video_path} crossOrigin="anonymous" id='video' controls />
                    {progressbar()}
                </div>
                <div className="right-pane">
                    <p className='title'>Video camera {data?.video?.camera?.camera_name}</p>
                    <p>Tạo vào ngày {new Date(start).formatMMDDYYYY()}</p>
                    <Dropzone multiple={true} onDrop={handleOnDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <section className='dropzone'>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {file ? <img className='thumb' src={file} /> : <p>Drag 'n' drop some files here, or click to select files</p>}
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <button disabled={!environment && !timeVideo} onClick={detectFaceFromVideo}>Xem kết quả</button>
                </div>
            </div>
        </div>
    );
}
