import React, { useEffect } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import { useParams } from "react-router-dom";
import "./css/index.scss";
import ListVideo from "./js/ListVideo";
import { AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp } from 'react-icons/ai';
import { BsArrowDownLeft, BsArrowDownRight, BsArrowUpLeft, BsArrowUpRight, BsArrowCounterclockwise } from 'react-icons/bs'

export default function CameraStream(props) {
    let { id } = useParams();
    let video;
    let port = 0;
    for (let i = 0; i < id.length; i++) {
        port += id.charCodeAt(i)
    }
    let canvas;

    useEffect(() => {
        canvas = document.getElementById("videoWrapper");
        const poster = ''
        video = new JSMpeg.VideoElement(
            "#videoWrapper",
            "ws://localhost:" + (9999 + port),
            { canvas: canvas },
            { preserveDrawingBuffer: true }
        );
        return () => {
            video.destroy();
        }
    }, []);

    const setHref = () => {
        if (canvas) document.getElementById("download").href = canvas.toDataURL();
    };

    return (
        <div id="Camera">
            <p className='title-1'>Xem trực tiếp</p>
            <div className='custom-container'>
                <div className="left-pane">
                    <canvas
                        id="videoWrapper"
                    />
                </div>
                <div className="right-pane">
                    <p className='title'>Camera</p>
                    <a
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
            <ListVideo />
        </div>
    );
}
