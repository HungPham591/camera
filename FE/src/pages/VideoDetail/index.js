import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Video(props) {
    const { id } = useParams();
    let video_path = `${process.env.REACT_APP_DOMAIN}\\video\\playVideo\\${id}`;

    const video_style = {
        width: "100vw",
        height: "94vh",
        position: "relative",
    };

    return (
        <div className="video-component">
            <video style={video_style} controls autoPlay>
                <source src={video_path} type="video/mp4" />
            </video>
        </div>
    );
}
