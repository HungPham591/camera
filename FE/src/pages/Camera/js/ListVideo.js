import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import apiCaller from "../../../api/apiCaller";

export default function ListVideo(props) {
    const [dataVideo, setDataVideo] = useState([]);

    let title = null;
    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        fetchVideo();
    }, []);

    const fetchVideo = async () => {
        let BODY = { _id: id };
        let listVideo = await apiCaller("/video/", "GET", BODY);
        setDataVideo([...dataVideo, ...listVideo?.data]);
    };

    const openVideo = (id) => {
        history.push("/Video/" + id);
    };

    return dataVideo.map((value, index) => {
        let date = new Date(value.video_time);
        let datetime =
            date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        let fullPath = `http://localhost:4000/data/${value.camera}/${value._id}.mp4`;
        return (
            <div key={index} className="card">
                <video className="card-img-top" src={fullPath} alt="Card image cap" />
                <div className="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">{datetime}</h6>
                    <button
                        className="btn btn-primary"
                        onClick={() => openVideo(value._id)}
                    >
                        Xem
                    </button>
                </div>
            </div>
        );
    });
}
