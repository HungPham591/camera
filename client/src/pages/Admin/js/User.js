import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../../graphql/user';
import { useQuery, useMutation } from '@apollo/client';
import { SelectPageContext } from "../index";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useForm } from 'react-hook-form';

export default function User(props) {
    let { setPageSelected, setUser } = React.useContext(SelectPageContext);

    const { loading, error, data } = useQuery(getUsers);
    const [page, setPage] = useState(1);
    const [modalSetting, setModalSetting] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [selectedSetting, setSelectedSetting] = useState({})
    const listColumn = ['#', 'user_name', 'user_role'];

    const [user_role, setRole] = useState(false);

    const [createItem, createMutation] = useMutation(createUser);
    const [updateItem, updateMutation] = useMutation(updateUser);
    const [deleteItem, deleteMutation] = useMutation(deleteUser);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSelectChange = (e) => {
        setRole(e.target.value);
    }

    const rederModalSetting = () => {
        const dropdown = (
            <select value={user_role} onChange={handleSelectChange} style={{ width: '100%', borderRadius: '5px', padding: '0.5rem', outline: 'none', border: '1.8px solid #eee', backgroundColor: '#eee' }} >
                <option value={true}>admin</option>
                <option value={false}>user</option>
            </select>
        )
        return (
            <form className={'modal ' + (modalSetting ? '' : 'd-none')} onSubmit={handleSubmit(onSubmitUpdate)}>
                <p className='title'>USER</p>
                <p className='label'>user name</p>
                <input type='text' value={selectedSetting?.user_name} />
                <p className='label'>user role</p>
                {dropdown}
                <input className='custom-button' type="submit" />
                <button className='custom-button' type='button' onClick={handleButtonDelete}>delete</button>
                <button className='custom-button' type='button' onClick={handleButtonDetail}>detail</button>
                <button className='custom-button' type='button' onClick={() => setModalSetting(false)}>close</button>
            </form>
        )
    }
    const rederModalAdd = () => {
        const dropdown = (
            <select value={user_role} onChange={handleSelectChange} style={{ width: '100%', borderRadius: '5px', padding: '0.5rem', outline: 'none', border: '1.8px solid #eee', backgroundColor: '#eee' }} >
                <option value={true}>admin</option>
                <option value={false}>user</option>
            </select>
        )
        return (
            <form className={'modal ' + (modalAdd ? '' : 'd-none')} onSubmit={handleSubmit(onSubmitAdd)}>
                <p className='title'>NEW USER</p>
                <p className='label'>user name</p>
                <input type='text' {...register('user_name')} />
                <p className='label'>user pass</p>
                <input type='text' {...register('user_pass')} />
                <p className='label'>user role</p>
                {dropdown}
                <input className='custom-button' type="submit" />
                <button className='custom-button' type='button' onClick={() => setModalAdd(false)}>close</button>
            </form>
        )
    }
    const handleButtonDelete = () => {
        if (!selectedSetting) return setModalSetting(false);
        deleteItem({
            variables: { _id: selectedSetting._id },
            refetchQueries: [{ query: getUsers }]
        })
        setModalSetting(false)
    }
    const handleButtonDetail = () => {
        setUser(selectedSetting)
        setPageSelected(7)
    }
    const handlePrevPage = () => {
        if (page !== 1) setPage(page - 1);
    }
    const handleNextPage = () => {
        setPage(page + 1);
    }
    const handleRowClick = (item) => {
        setRole(item.user_role)
        setSelectedSetting(item);
        setModalSetting(true);
    }
    const handleButtonAddClick = () => {
        setModalAdd(true);
    }
    const onSubmitAdd = (data) => {
        data = { ...data, user_role: user_role == 'true' ? true : false }
        console.log(data)
        createItem({
            variables: data,
            refetchQueries: [{ query: getUsers }]
        })
        setModalAdd(false)
    }
    const onSubmitUpdate = (data) => {
        data = {
            _id: selectedSetting?._id,
            user_role: user_role == 'true' ? true : false
        }
        updateItem({
            variables: data,
            refetchQueries: [{ query: getUsers }]
        })
        setModalSetting(false)
    }
    return (
        <div>
            <input className='search-input' placeholder='Type in to Search...' />
            <p className='title'>USER</p>
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
                            data?.users?.map((value, index) => {
                                return (
                                    <tr key={index} onClick={() => handleRowClick(value)}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value.user_name}</td>
                                        <td>{value?.user_role ? 'admin' : 'user'}</td>
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
            {rederModalSetting()}
            {rederModalAdd()}
            <BsFillPlusCircleFill className='btn-add' onClick={handleButtonAddClick} />
        </div>
    )
}