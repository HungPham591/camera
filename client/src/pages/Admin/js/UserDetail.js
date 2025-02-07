import React, { useEffect, useState } from 'react';
import { getUser } from '../../../graphql/user';
import { useQuery } from '@apollo/client';
import moment from 'moment';

import { SelectPageContext } from "../index";

export default function UserDetail(props) {
    const { user } = React.useContext(SelectPageContext);

    const { loading, error, data } = useQuery(getUser, { variables: { _id: user?._id } });
    const listColumn = ['#', 'camera_name', 'camera_url', 'numberOfVideos', 'numberOfReports', 'createdAt'];

    const table = () => {
        const body = data?.user?.cameras?.map((value, index) => {
            const numberOfReports = value?.reports?.length;
            const numberOfVideos = value?.videos?.length;
            return (
                <tr key={index} >
                    <th scope="row">{index + 1}</th>
                    <td>{value.camera_name}</td>
                    <td>{value.camera_link}</td>
                    <td>{numberOfVideos}</td>
                    <td>{numberOfReports}</td>
                    <td>{moment(value.createdAt).format('HH:mm DD/MM/YYYY')}</td>
                </tr>
            )
        })
        return (
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
                    {body}
                </tbody>
            </table>
        )
    }
    return (
        <div>
            <p className='title' style={{ marginBottom: '3vh' }}>THÔNG TIN USER</p>
            <p className='label'>TÊN USER</p>
            <p>{data?.user?.user_name}</p>
            <p className='label'>NGÀY TẠO</p>
            <p>{moment(data?.user?.createdAt).format('HH:mm DD/MM/YYYY')}</p>
            <div className='table-pane'>
                {table()}
            </div>
        </div>
    );
}