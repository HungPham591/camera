import React, { useState, useEffect, useRef } from "react";
import Dropzone from 'react-dropzone'
import { useParams } from "react-router-dom";
import "./css/index.scss";
import * as faceapi from "face-api.js";
import { useQuery, useLazyQuery } from '@apollo/client';
import { getVideo } from '../../graphql/video';
import { getReports } from '../../graphql/report'
import moment from 'moment';

export default function Video(props) {
    const isMounted = useRef(true);

    const { id } = useParams();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
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

    useEffect(() => {
        loadModels()
        return () => { isMounted.current = false; };
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
        if (!faceapi.nets.tinyFaceDetector.isLoaded || !faceapi.nets.faceLandmark68Net.isLoaded || !faceapi.nets.faceRecognitionNet.isLoaded || !faceapi.nets.faceExpressionNet.isLoaded)
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(path),
                faceapi.nets.faceLandmark68Net.loadFromUri(path),
                faceapi.nets.faceRecognitionNet.loadFromUri(path),
                faceapi.nets.faceExpressionNet.loadFromUri(path)
            ])
        setEnvironment(true);
    }
    const handleVideoOnPlay = () => {
        // let interval = setInterval(() => {
        //     if (videoRef.current?.paused || !isMounted.current) return clearInterval(interval);
        //     faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions)
        //         .withFaceLandmarks()
        //         .then(data => {
        //             if (!data) return;
        //             drawDetections(data);
        //         });
        // }, 500);
    }
    const drawDetections = (data) => {
        if (!isMounted.current || !data || !canvasRef.current?.getContext('2d')) return;
        const displaySize = {
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight,
        }
        faceapi.matchDimensions(canvasRef.current, displaySize)
        const resizedDetections = faceapi.resizeResults(data, displaySize);
        canvasRef.current.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height);
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
        drawDetections(detections);
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
                <p style={{ left: 0 }}>{moment(start).format('DD/MM/YYYY')}</p>
                {
                    reports?.reports?.map((value, index) => {
                        if (new Date(value.createdAt).getTime() < start || new Date(value.createdAt).getTime() > end) return;
                        let time = new Date(value.createdAt).getTime();
                        const point = (time - start) * 100 / (end - start);
                        return (
                            <div key={index}>
                                <li style={{ left: `${point}%` }} onClick={() => handleButtonSeek(point / 100)}></li>
                                <p style={{ left: `${point}%` }}>{moment(value.createdAt).format('HH:mm')}</p>
                            </div>
                        )
                    })
                }
                <li style={{ right: 0 }}></li>
                <p style={{ right: 0 }}>{moment(end).format('DD/MM/YYYY')}</p>
            </ul >
        )
    }


    return (
        <div id="VideoDetail">
            <p className='title-1'>Xem lại</p>
            <div className='custom-container'>
                <div className="left-pane">
                    <div>
                        {videos ? <video ref={videoRef} src={video_path} crossOrigin="anonymous" id='video' controls onPlay={handleVideoOnPlay} /> : ''}
                        <canvas ref={canvasRef} className='position-absolute' />
                    </div>
                    {progressbar()}
                </div>
                <div className="right-pane">
                    <p className='title'>Video camera {videos?.video?.camera?.camera_name}</p>
                    <p>{moment(start).format('DD/MM/YYYY HH:mm')}</p>
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
