import React, { useEffect, useState } from 'react';
import { getCameras } from '../../../graphql/camera';
import { useQuery } from '@apollo/client'

export default function Camera(props) {
    const { loading, error, data } = useQuery(getCameras);
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState({})
    const listColumn = ['#', 'camera_id', 'camera_name', 'camera_uri', 'camera_public'];

    const renderModal = () => {
        return (
            <div className={'modal ' + (modal ? '' : 'd-none')}>
                <p className='title'>VIDEO</p>
                {
                    listColumn.map((value, index) => {
                        if (index === 0) return;
                        return (
                            <div key={index}>
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
    const handlePrevPage = () => {
        if (page !== 1) setPage(page - 1);
    }
    const handleNextPage = () => {
        setPage(page + 1);
    }
    const handleRowClick = (item) => {
        setSelected(item);
        setModal(true);
    }
    return (
        <div>
            <input className='search-input' placeholder='Type in to Search...' />
            <p className='title'>CAMERA</p>
            <div className='table-pane'>
                <table className="table">
                    <thead className='thead-dark'>
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
                            data?.cameras?.map((value, index) => {
                                return (
                                    <tr key={index} onClick={() => handleRowClick(value)}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value._id}</td>
                                        <td>{value.camera_name}</td>
                                        <td>{value.camera_link}</td>
                                        <td>{value.camera_public ? 'co' : 'khong'}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <ul className="pagination">
                <li className="page-item" onClick={handlePrevPage}><p className="page-link">Previous</p></li>
                <li className="page-item"><p className="page-link">{page}</p></li>
                <li className="page-item" onClick={handleNextPage}><p className="page-link">Next</p></li>
            </ul>
            {renderModal()}
        </div>
    )
}