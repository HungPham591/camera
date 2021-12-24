import React, { useEffect, useState } from 'react';
import { getReports } from '../../../graphql/report';
import { useQuery } from '@apollo/client';
import moment from 'moment';

import { SelectPageContext } from "../index";

export default function Report(props) {
    let { setPageSelected, setCamera } = React.useContext(SelectPageContext);

    const { data } = useQuery(getReports);
    const [page, setPage] = useState(1);
    const listColumn = ['#', 'camera_id', 'male', 'female', 'age', 'createdAt'];



    const handlePrevPage = () => {
        if (page !== 1) setPage(page - 1);
    }
    const handleNextPage = () => {
        setPage(page + 1);
    }
    const handleRowClick = (item) => {
        setCamera(item?.camera_id)
        setPageSelected(8)
    }
    return (
        <div>
            <input className='search-input' placeholder='Type in to Search...' />
            <p className='title'>REPORT</p>
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
                            data?.reports?.map((value, index) => {
                                const male = value?.report_description?.filter(item => item?.gender === 'male').length || 0;
                                const female = value?.report_description?.filter(item => item?.gender === 'female').length || 0;
                                let age = value?.report_description?.reduce(((pre, cur) => pre + cur.age), 0);
                                age = age / (value?.report_description?.length || 1);
                                age = Math.round(age / value?.report_description?.length)
                                return (
                                    <tr key={index} onClick={() => handleRowClick(value)}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value._id}</td>
                                        <td>{male}</td>
                                        <td>{female}</td>
                                        <td>{age}</td>
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