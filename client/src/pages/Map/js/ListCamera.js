import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { getCameras } from '../../../graphql/camera'
import { useRef } from "react";
import Hls from 'hls.js';
import moment from 'moment';

export default function ListCamera(props) {
    const refInput = useRef(null);
    const refVideo = useRef([]);

    const onCompleted = ({ cameras }) => {
        cameras?.map((value, index) => {
            let videoSrc = `${process.env.REACT_APP_DOMAIN}\\stream\\${value._id}\\index.m3u8`;
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(refVideo.current[index]);
        })
    }
    const { loading, error, data, refetch } = useQuery(getCameras, { onCompleted });


    let history = useHistory();
    const openStream = (_id) => {
        history.push("/Camera/" + _id);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            refetch({ camera_name: refInput.current.value })
        }
    }
    const handleSearchButton = () => {
        refetch({ camera_name: refInput.current.value })
    }
    const listCamera = () => {
        return data?.cameras?.map((value, index) => {

            return (
                <div key={index} className="custom-card">
                    <video ref={el => refVideo.current[index] = el}></video>
                    <div className="card-body">
                        <h5 className="card-title">Camera {value.camera_name}</h5>
                        <p>{value.camera_link}</p>
                        <p>{moment(value?.updatedAt).format('DD/MM/YYYY')}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => openStream(value._id)}
                        >
                            Xem
                        </button>
                    </div>
                </div>
            );
        })
    }

    return (
        <div>
            <p className='title'>Camera xung quanh đây</p>
            <div className='search'>
                <input ref={refInput} onKeyDown={handleKeyDown} placeholder="Nhập tên camera..." />
                <button className='btn btn-primary' onClick={handleSearchButton}>Search</button>
            </div>
            {data?.cameras?.length === 0 ?? <h4>Chưa có camera</h4>}
            {listCamera()}
        </div>
    )

}
