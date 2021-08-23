import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import apiCaller from "../../api/apiCaller";
import Nav from "../share/Nav";
import Footer from "../share/Footer";

export default function Video(props) {
    const { id } = useParams();
    let video_path = `/video/playVideo/${id}`;

    const video_style = {
        width: "100vw",
        height: "94vh",
        position: "relative",
    };

    return (
        <>
            <Nav />
            <div className="video-component">
                <video style={video_style} controls autoPlay>
                    <source src={video_path} type="video/mp4" />
                </video>
            </div>
            <Footer />
        </>
    );
}
