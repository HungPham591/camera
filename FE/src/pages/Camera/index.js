import React, { useEffect } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import { useParams } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import "./css/index.scss";
import ListVideo from "./js/ListVideo";
import ListReport from "./js/ListReport";

export default function CameraStream(props) {
    let { id } = useParams();

    let port = 0;
    for (let i = 0; i < id.length; i++) {
        port += id.charCodeAt(i)
    }
    let canvas;

    useEffect(() => {
        canvas = document.getElementById("videoWrapper");
        new JSMpeg.VideoElement(
            "#videoWrapper",
            "ws://localhost:" + (9999 + port),
            { canvas: canvas, loop: true, autoplay: true },
            { preserveDrawingBuffer: true }
        );
    }, []);

    const setHref = () => {
        if (canvas) document.getElementById("download").href = canvas.toDataURL();
    };

    return (
        <div id="Camera">
            <div className="left-pane">
                <canvas
                    id="videoWrapper"
                />
            </div>
            <div className="right-pane">
                <p className='title'>Camera {id}</p>
                <a
                    href="/#"
                    id="download"
                    className="btn btn-primary"
                    onClick={setHref}
                    download="camera"
                >
                    Download
                </a>
                <Tabs defaultActiveKey="video">
                    <Tab eventKey="video" title="Video">
                        <ListVideo />
                    </Tab>
                    <Tab eventKey="report" title="Report">
                        <ListReport />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
