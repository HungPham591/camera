import React, { useEffect, useState } from 'react';
import { getUsers, getUser } from '../../../graphql/user';
import { getCameras } from '../../../graphql/camera';
import { getReports } from '../../../graphql/report';
import { getVideos } from '../../../graphql/video';
import { useQuery } from '@apollo/client';
import moment from 'moment';

export default function Dashboard() {
    const { data: dataUser } = useQuery(getUsers);
    const { data: dataCamera } = useQuery(getCameras);
    const { data: dataReport } = useQuery(getReports);
    const { data: dataVideo } = useQuery(getVideos);
    const listColumn = ['#', 'user_id', 'user_name', 'create_at'];

    const handleRowClick = (item) => {

    }

    return (
        <div className='dashboard'>
            <p className='title'>DASHBOARD</p>
            <div className='pane1'>
                <div>
                    <p className='small-text'>Number of cameras</p>
                    <p className='text'>{dataCamera?.cameras?.length || 0}</p>
                </div>
                <div>
                    <p className='small-text'>Number of videos</p>
                    <p className='text'>{dataVideo?.videos?.length || 0}</p>
                </div>
                <div>
                    <p className='small-text'>Number of reports</p>
                    <p className='text'>{dataReport?.reports?.length || 0}</p>
                </div>
            </div>
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
                            dataUser?.users?.map((value, index) => {
                                return (
                                    <tr key={index} onClick={() => handleRowClick(value)}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value._id}</td>
                                        <td>{value.user_name}</td>
                                        <td>{moment(value.createdAt).format('HH:mm DD/MM/YYYY')}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}