import React, { useState, useEffect, useRef } from "react";
import Dropzone from 'react-dropzone'
import { useParams } from "react-router-dom";
import "./css/index.scss";

export default function Video(props) {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const video_path = `${process.env.REACT_APP_DOMAIN}\\video\\playVideo\\${id}`;

    const handleOnDrop = (file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file[0]);
        reader.onload = () => {
            setFile(reader.result)
        };
    }

    return (
        <div id="VideoDetail">
            <p className='title-1'>Xem lại</p>
            <div className='custom-container'>
                <div className="left-pane">
                    <video id='video' controls autoPlay>
                        <source src={video_path} type="video/mp4" />
                    </video>
                    <ul class="progressbar">
                        <li style={{ left: 0 }}></li>
                        <li style={{ left: `calc(100% / ${5})` }}></li>
                        <li style={{ right: 0 }}></li>
                    </ul>
                    <ul class="progressbar-time">
                        <li style={{ left: 0 }}>21/1/1999</li>
                        <li style={{ left: `calc(100% / ${5})` }}>15:03</li>
                        <li style={{ right: 0 }}>21/1/1999</li>
                    </ul>
                </div>
                <div className="right-pane">
                    <p className='title'>Video</p>
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
                    <button>Xem kết quả</button>
                </div>
            </div>
        </div>
    );
}
