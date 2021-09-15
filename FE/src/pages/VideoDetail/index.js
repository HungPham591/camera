import React, { useState, useEffect, useRef } from "react";
import Dropzone from 'react-dropzone'
import { useParams } from "react-router-dom";
import { getReportByVideo } from '../../services/report';
import { getVideo } from '../../services/video';
import "./css/index.scss";
import * as faceapi from "face-api.js";

export default function Video(props) {
    const { id } = useParams();
    const videoRef = useRef(null);
    const [timeVideo, setTimeVideo] = useState(false);
    const [environment, setEnvironment] = useState(false);
    const [video, setVideo] = useState(null);
    const [reports, setReports] = useState([]);
    const [file, setFile] = useState(null);
    const video_path = `${process.env.REACT_APP_DOMAIN}\\video\\playVideo\\${id}`;
    //date time
    const start = new Date(video?.createdAt)?.getTime();
    let end = start + 60 * 1000;
    const startDate = new Date(start).getDate();
    const startMonth = new Date(start).getMonth();
    const startYear = new Date(start).getFullYear();
    const endDate = new Date(end).getDate();
    const endMonth = new Date(end).getMonth();
    const endYear = new Date(end).getFullYear();

    useEffect(() => {
        fetchReport();
        loadModels();
        checkLoadComplete();
        return () => {
        }
    }, [])

    const fetchReport = async () => {
        const video = await fetchVideo();
        const listReport = await getReportByVideo({ start, end });
        setReports(listReport)
    }
    const fetchVideo = async () => {
        const video = await getVideo({ _id: id });
        setVideo(video[0]);
        return video[0];
    }

    const handleOnDrop = (file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file[0]);
        reader.onload = () => {
            console.log(reader.result)
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
        if (!video?.createdAt) return;
        return (
            <ul className="progressbar">
                <li style={{ left: 0 }}></li>
                {
                    reports.map((value, index) => {
                        const time = new Date(value.createdAt).getTime();
                        const point = (time - start) / (end - start);
                        return (
                            <li key={index} style={{ left: `${point}%` }}></li>
                        )
                    })
                }
                <li style={{ right: 0 }}></li>
            </ul >
        )
    }
    const progressbarTime = () => {
        if (!video?.createdAt) return;
        return (
            <ul className="progressbar-time">
                <li style={{ left: 0 }}>{startDate}/{startMonth}/{startYear}</li>
                {
                    reports.map((value, index) => {
                        const time = new Date(value.createdAt).getTime();
                        const point = (time - start) / (end - start);
                        const pointHour = new Date(time).getHours();
                        const pointMinute = new Date(time).getMinutes();
                        return (
                            <li key={index} style={{ left: `${point}%` }}>{pointMinute}:{pointHour}</li>
                        )
                    })
                }
                <li style={{ right: 0 }}>{endDate}/{endMonth}/{endYear}</li>
            </ul>
        )
    }

    return (
        <div id="VideoDetail">
            <p className='title-1'>Xem lại</p>
            <div className='custom-container'>
                <div className="left-pane">
                    <video ref={videoRef} src={video_path} crossOrigin="anonymous" id='video' controls />
                    {progressbar()}
                    {progressbarTime()}
                </div>
                <div className="right-pane">
                    <p className='title'>Video camera {video?.camera?.camera_name}</p>
                    <p>Tạo vào ngày {startDate}/{startMonth}/{startYear}</p>
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
