import { useHistory } from "react-router-dom";
import { useQuery, useLazyQuery } from '@apollo/client'
import { getCamerasByName } from '../../../graphql/camera'
import cameraLogo from '../css/camera.jpg'
import { useRef } from "react";

export default function ListCamera(props) {
    const refInput = useRef(null)
    const { loading, error, data, refetch } = useQuery(getCamerasByName, { variables: { camera_name: '' } });

    let history = useHistory();
    const openStream = (_id) => {
        history.push("/Camera/" + _id);
    };
    const handleButtonSearch = () => {
        const value = refInput.current.value
        refetch({ camera_name: value })
    }

    return (
        <div>
            <p className='title'>Camera xung quanh đây</p>
            <div className='input'>
                <input ref={refInput} placeholder="Nhập tên camera" />
                <button className='btn-search' onClick={handleButtonSearch}>Search</button>
            </div>
            {!loading ?? <h4>Loading books....</h4>}
            {!error ?? <h4>Error loading books!</h4>}
            {data?.camerasByName?.length === 0 ?? <h4>Chưa có camera</h4>}
            {
                data?.camerasByName?.map((value, index) => {
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
