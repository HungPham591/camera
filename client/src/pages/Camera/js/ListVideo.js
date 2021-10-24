import React from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ListVideo(props) {
    let { id } = useParams();
    let history = useHistory();

    const openVideo = (id) => {
        history.push("/Video/" + id);
    };
    return (
        <div id='list-video'>
            {
                props?.videos?.map((value, index) => {
                    let date = new Date(value.video_time);
                    let datetime =
                        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                    let fullPath = `${process.env.REACT_APP_DOMAIN}\\data\\${props.camera}_${value.video_time}.mp4`;
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
