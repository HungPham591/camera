import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../graphql/user';
import { useQuery } from '@apollo/client';

export default function User(props) {
    const { loading, error, data } = useQuery(getUsers);
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState({})
    const listColumn = ['#', 'user_id', 'user_name', 'user_pass', 'create_at'];

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
            <p className='title'>USER</p>
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
                            data?.users?.map((value, index) => {
                                const minute = new Date(value.createdAt).getMinutes();
                                const hour = new Date(value.createdAt).getHours();
                                const date = new Date(value.createdAt).getDate();
                                const month = new Date(value.createdAt).getMonth() + 1;
                                const year = new Date(value.createdAt).getFullYear();
                                return (
                                    <tr key={index} onClick={() => handleRowClick(value)}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value._id}</td>
                                        <td>{value.user_name}</td>
                                        <td>{value.user_pass}</td>
                                        <td>{minute}:{hour} {date}/{month}/{year}</td>
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