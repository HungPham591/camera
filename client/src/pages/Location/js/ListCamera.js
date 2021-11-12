import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/client';
import React, { useRef } from "react";
import moment from 'moment';
import { useParams } from "react-router-dom";
import { getLocation } from '../../../graphql/location';
import Hls from 'hls.js';
import { useEffect } from "react";

export default function ListCamera(props) {
    let { id } = useParams();
    const refVideo = useRef([]);

    const { data } = useQuery(getLocation, { variables: { _id: id } });

    useEffect(() => {
        data?.location?.cameras?.map((value, index) => {
            let videoSrc = `${process.env.REACT_APP_DOMAIN}\\stream\\${value._id}\\index.m3u8`;
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(refVideo.current[index]);
        })
    }, [data])


    let history = useHistory();
    const openCamera = (_id) => {
        history.push("/camera/" + _id);
    };

    const listCamera = () => {
        return data?.location?.cameras?.map((value, index) => {
            return (
                <div key={index} className="custom-card">
                    <video ref={el => refVideo.current[index] = el}></video>
                    <div className="card-body">
                        <h5 className="card-title">{value.camera_name}</h5>
                        <p>{moment(value?.updatedAt).format('DD/MM/YYYY')}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => openCamera(value._id)}
                        >
                            Xem
                        </button>
                    </div>
                </div>
            );
        })
    }

    return <div>{listCamera()}</div>
}
