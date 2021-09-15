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
        let BODY = { camera: id };
        let listVideo = await apiCaller("/video/", "POST", BODY);
        setDataVideo(listVideo?.data ? listVideo.data : []);
    };

    const openVideo = (id) => {
        history.push("/Video/" + id);
    };
    return (
        <div id='list-video'>
            {
                dataVideo?.map((value, index) => {
                    let date = new Date(value.video_time);
                    let datetime =
                        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                    let fullPath = `${process.env.REACT_APP_DOMAIN}\\data\\${value.camera._id}\\${value._id}.mp4`;
                    return (
                        <div key={index} className='custom-card'>
                            <video src={fullPath} alt='thumb' />
                            <div className='body'>
                                <p className='title'>{datetime}</p>
                                <button onClick={() => openVideo(value._id)}>Xem</button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}
