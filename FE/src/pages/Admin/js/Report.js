import React, { useEffect, useState } from 'react';
import { getAllReport } from '../../../services/report';

export default function Report(props) {
    const [report, setReport] = useState([]);
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState({})
    const listColumn = ['#', 'camera_id', 'createdAt'];
    useEffect(() => {
        fetchReport();
    }, []);
    const fetchReport = async () => {
        let reports = await getAllReport();
        setReport(reports);
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
            <p className='title'>REPORT</p>
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
                            report.map((value, index) => {
                                const minute = new Date(value.createdAt).getMinutes();
                                const hour = new Date(value.createdAt).getHours();
                                const date = new Date(value.createdAt).getDate();
                                const month = new Date(value.createdAt).getMonth() + 1;
                                const year = new Date(value.createdAt).getFullYear();
                                return (
                                    <tr key={index} onClick={() => handleRowClick(value)}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value._id}</td>
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