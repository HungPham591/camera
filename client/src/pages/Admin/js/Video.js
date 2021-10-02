import React, { useEffect, useState } from 'react';
import { getVideos } from '../../../graphql/video';
import { useQuery } from '@apollo/client'

export default function Video(props) {
    const { loading, error, data } = useQuery(getVideos);
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState({})
    const listColumn = ['#', 'video_id', 'camera_id', 'createdAt'];

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
    const handleRowClick = (item) => {
        setSelected(item);
        setModal(true);
    }
    return (
        <div>
            <p className='title'>VIDEO</p>
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
                            data?.videos?.map((value, index) => {
                                const minute = new Date(value.createdAt).getMinutes();
                                const hour = new Date(value.createdAt).getHours();
                                const date = new Date(value.createdAt).getDate();
                                const month = new Date(value.createdAt).getMonth() + 1;
                                const year = new Date(value.createdAt).getFullYear();
                                return (
                                    <tr key={index} onClick={() => handleRowClick(value)}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value._id}</td>
                                        <td>{value.camera}</td>
                                        <td>{minute}:{hour} {date}/{month}/{year}</td>
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