import React, { useEffect, useState } from 'react';
import { getVideo } from '../../services/video';
import "./css/index.scss";

export default function Video(props) {
    const [video, setVideo] = useState([]);
    useEffect(() => {
        fetchVideo()
    }, [])
    const fetchVideo = async () => {
        const listVideo = await getVideo();
        setVideo(listVideo);
    }
    const renderListVideo = () => {
        return video?.map((value, index) => {
            const imgPath = `${process.env.REACT_APP_DOMAIN}\\data\\${value.camera}\\${value._id}.mp4`;
            const time = new Date(value.video_time);
            const date = time.getDate();
            const month = time.getMonth() + 1;
            const year = time.getFullYear();
            const hour = time.getHours();
            const minute = time.getMinutes();
            return (
                <div className='card' key={index}>
                    <img src={imgPath} />
                    <div className='content'>
                        <p className='title'>Video</p>
                        <p className='time'>{date}/{month}/{year} {minute}:{hour}</p>
                    </div>
                </div>
            )
        })
    }
    return (
        <div id='Video'>
            <div className='left-pane'>

            </div>
            <div className='right-pane'>
                <div style={{ display: 'flex', marginBottom: '2vh' }}>
                    <input className='search' placeholder='search report' />
                    <button className='btn-search'>Search</button>
                </div>
                <p className='title'>List of video</p>
                {renderListVideo()}
            </div>
        </div>
    );
}