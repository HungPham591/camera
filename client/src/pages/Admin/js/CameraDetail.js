import React, { useEffect, useState } from 'react';
import { getCamera } from '../../../graphql/camera';
import { useQuery } from '@apollo/client';
import moment from 'moment';

import { SelectPageContext } from "../index";

export default function CameraDetail(props) {
    const { camera } = React.useContext(SelectPageContext);

    const { loading, error, data } = useQuery(getCamera, { variables: { _id: camera?._id } });
    const listColumn = ['#', 'males', 'females', 'age', 'createdAt'];

    const table = () => {
        const body = data?.camera?.reports?.map((value, index) => {
            const male = value?.report_description?.filter(item => item?.gender === 'male').length || 0;
            const female = value?.report_description?.filter(item => item?.gender === 'female').length || 0;
            let age = value?.report_description?.reduce(((pre, cur) => pre + cur.age), 0);
            age = age / (value?.report_description?.length || 1);
            age = Math.round(age / value?.report_description?.length)
            return (
                <tr key={index} >
                    <th scope="row">{index + 1}</th>
                    <td>{male}</td>
                    <td>{female}</td>
                    <td>{age}</td>
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
            <p className='title' style={{ marginBottom: '3vh' }}>THÔNG TIN CAMERA</p>
            <p className='label'>TÊN CAMERA</p>
            <p>{data?.camera?.camera_name}</p>
            <p className='label'>NGÀY TẠO</p>
            <p>{data?.camera?.createdAt}</p>
            <p className='label'>SỐ VIDEO</p>
            <p>{data?.camera?.reports?.length}</p>
            <div className='table-pane'>
                {table()}
            </div>
        </div>
    );
}