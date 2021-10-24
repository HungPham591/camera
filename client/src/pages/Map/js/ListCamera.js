import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { getCameras } from '../../../graphql/camera'
import cameraLogo from '../css/camera.jpg'
import { useRef } from "react";

export default function ListCamera(props) {
    const refInput = useRef(null)
    const { loading, error, data, refetch } = useQuery(getCameras);

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

    return (
        <div>
            <p className='title'>Camera xung quanh đây</p>
            <div className='search'>
                <input ref={refInput} onKeyDown={handleKeyDown} placeholder="Nhập tên camera..." />
                <button className='btn btn-primary' onClick={handleSearchButton}>Search</button>
            </div>
            {data?.cameras?.length === 0 ?? <h4>Chưa có camera</h4>}
            {
                data?.cameras?.map((value, index) => {
                    return (
                        <div key={index} className="custom-card">
                            <img src={cameraLogo} alt="" />
                            <div className="card-body">
                                <h5 className="card-title">Camera {value.camera_name}</h5>
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
        </div>
    )

}
