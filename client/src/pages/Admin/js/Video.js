import React, { useEffect, useState } from 'react';
import { getVideos } from '../../../graphql/video';
import { useQuery } from '@apollo/client'
import moment from 'moment';

export default function Video(props) {
    const { loading, error, data } = useQuery(getVideos);
    const [page, setPage] = useState(1);
    const listColumn = ['#', 'video_id', 'camera_id', 'createdAt'];


    const handlePrevPage = () => {
        if (page !== 1) setPage(page - 1);
    }
    const handleNextPage = () => {
        setPage(page + 1);
    }

    return (
        <div>
            <input className='search-input' placeholder='Type in to Search...' />
            <p className='title'>VIDEO</p>
            <div className='table-pane'>
                <table className="table table-striped">
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
                            data?.videos?.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value._id}</td>
                                        <td>{value.camera._id}</td>
                                        <td>{moment(value.createdAt).format('HH:mm DD/MM/YYYY')}</td>
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
        </div>
    )
}