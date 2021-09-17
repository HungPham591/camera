import React, { useEffect, useState } from 'react';
import { getCamera } from '../../../services/camera';

export default function Camera(props) {
    const [camera, setCamera] = useState([]);
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState({})
    const listColumn = ['#', 'camera_id', 'camera_name', 'camera_drive', 'camera_link', 'camera_location', 'camera_public'];
    useEffect(() => {
        fetchCamera();
    }, []);
    const fetchCamera = async () => {
        let listCamera = await getCamera({});
        setCamera(listCamera)
    }
    const renderModal = () => {
        return (
            <div className={'modal ' + (modal ? '' : 'd-none')}>
                <p className='title'>VIDEO</p>
                {
                    listColumn.map((value, index) => {
                        if (index === 0) return;
                        return (
                            <div>
                                <p className='label'>{value}</p>
                                <input type='text' value={Object.values(selected)[index - 1]} />
                            </div>
                        )
                    })
                }
                <button onClick={() => setModal(false)}>close</button>
            </div>
        )
    }
    const handleRowClick = (item) => {
        setSelected(item);
        setModal(true);
    }
    return (
        <div>
            <p className='title'>CAMERA</p>
            <div className='table-pane'>
                <table className="table">
                    <thead>
                        <tr>
                            {
                                listColumn.map((value, index) =>
                                    <th key={index} scope="col">{value}</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            camera.map((value, index) => {
                                return (
                                    <tr key={index} onClick={() => handleRowClick(value)}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value._id}</td>
                                        <td>{value.camera_name}</td>
                                        <td>{value.camera_drive}</td>
                                        <td>{value.camera_link}</td>
                                        <td>{value.camera_location}</td>
                                        <td>{value.camera_public ? 'co' : 'khong'}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {renderModal()}
        </div>
    )
}