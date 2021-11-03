import React from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from 'moment';

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
                    let fullPath = `${process.env.REACT_APP_DOMAIN}\\data\\${props.camera}_${value.video_time}.mp4`;
                    return (
                        <div key={index} className='custom-card'>
                            <video className='video' src={fullPath} alt='thumb' />
                            <div className='body'>
                                <p className='title'>{moment(value.video_time).format('YYYY-MM-DD')}</p>
                                <button onClick={() => openVideo(value._id)}>Xem</button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}
