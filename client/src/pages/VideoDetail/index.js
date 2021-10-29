import React, { useState, useEffect, useRef } from "react";
import Dropzone from 'react-dropzone'
import { useParams } from "react-router-dom";
import "./css/index.scss";
import * as faceapi from "face-api.js";
import { useQuery, useLazyQuery } from '@apollo/client';
import { getVideo } from '../../graphql/video';
import { getReports } from '../../graphql/report'

export default function Video(props) {
    const { id } = useParams();
    const videoRef = useRef(null);
    const [timeVideo, setTimeVideo] = useState(false);
    const [environment, setEnvironment] = useState(false);
    const [file, setFile] = useState(null);

    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null);

    const onCompleted = ({ video }) => {
        setStart(new Date(video?.createdAt).getTime());
    }
    const { data: videos } = useQuery(getVideo, {
        variables: {
            _id: id,
        },
        skip: id === null,
        onCompleted
    });
    const [fetchReports, { data: reports }] = useLazyQuery(getReports);

    const video_path = `${process.env.REACT_APP_DOMAIN}\\video\\${videos?.video?.camera?._id}_${videos?.video?.video_time}`;

    Date.prototype.formatMMDDYYYY = function () {
        return this.getDate() +
            "/" + (this.getMonth() + 1) +
            "/" + this.getFullYear();
    }
    Date.prototype.formatmmhh = function () {
        return `${this.getHours()}:${this.getMinutes()}`
    }
    useEffect(() => {
        loadModels();
    }, [])
    useEffect(() => {
        if (end) fetchReports({ variables: { start, end } });
    }, [end])
    useEffect(() => {
        if (start) checkLoadComplete();
    }, [start])

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
            setEnd(new Date(start).getTime() + videoTime * 1000);
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
    const handleButtonSeek = (time) => {
        const video = videoRef.current;
        video.currentTime = time;
    }
    const progressbar = () => {
        if (!videos?.video?.createdAt || !reports) return;
        return (
            <ul className="progressbar">
                <li style={{ left: 0 }}></li>
                <p style={{ left: 0 }}>{new Date(start).formatMMDDYYYY()}</p>
                {
                    reports?.reports?.map((value, index) => {
                        if (new Date(value.createdAt).getTime() < start || new Date(value.createdAt).getTime() > end) return;
                        let time = new Date(value.createdAt).getTime();
                        const point = (time - start) * 100 / (end - start);
                        const day = new Date(time).formatmmhh();
                        time = new Date(time);
                        return (
                            <div key={index}>
                                <li style={{ left: `${point}%` }} onClick={() => handleButtonSeek(point / 100)}></li>
                                <p style={{ left: `${point}%` }}>{day}</p>
                            </div>
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
                    {videos ? <video ref={videoRef} src={video_path} crossOrigin="anonymous" id='video' controls /> : ''}
                    {progressbar()}
                </div>
                <div className="right-pane">
                    <p className='title'>Video camera {videos?.video?.camera?.camera_name}</p>
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
