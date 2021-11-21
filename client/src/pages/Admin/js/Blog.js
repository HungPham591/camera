import React, { useRef, useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { getBlogs, createBlog, deleteBlog, updateBlog } from '../../../graphql/blog';
import { useQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment';

export default function Blog(state) {
    const { loading, error, data } = useQuery(getBlogs);
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState(null)
    const listColumn = ['#', 'blog_id', 'blog_title', 'last update'];

    const dataEditor = useRef(null);

    const [createItem, createMutation] = useMutation(createBlog);
    const [updateItem, updateMutation] = useMutation(updateBlog);
    const [deleteItem, deleteMutation] = useMutation(deleteBlog);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleOnEditorChange = (e, editor) => {
        const data = editor.getData();
        dataEditor.current = data;
    }

    const onSubmit = (data) => {
        data = { ...data, blog_content: dataEditor.current };
        if (!selected)
            createItem({
                variables: data,
                refetchQueries: [{ query: getBlogs }]
            })
        else
            updateItem({
                variables: data,
                refetchQueries: [{ query: getBlogs }]
            })
        setModal(false)
    }
    const handleDeleteButton = () => {
        if (!selected) return setModal(false);
        deleteItem({
            variables: { _id: selected._id },
            refetchQueries: [{ query: getBlogs }]
        })
        setModal(false)
    }
    const handleCloseButton = () => {
        setSelected(null);
        setModal(false)
    }
    const renderModal = () => {
        return (
            <form className={'modal ' + (modal ? '' : 'd-none')} onSubmit={handleSubmit(onSubmit)}>
                <p className='title'>BLOG</p>
                <p className='label'>Title</p>
                <input type='text' {...register('blog_title')} defaultValue={selected?.blog_title || ''} required />
                <p className='label'>Content</p>
                <CKEditor editor={ClassicEditor} data={selected?.blog_content || ''} onChange={handleOnEditorChange} />
                <input className='custom-button' type="submit" />
                <button className='custom-button' type='button' onClick={handleDeleteButton}>Delete</button>
                <button className='custom-button' type='button' onClick={handleCloseButton}>close</button>
            </form>
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
    const handleButtonAddClick = () => {
        setSelected(null);
        setModal(true);
    }
    return (
        <div>
            <input className='search-input' placeholder='Type in to Search...' />
            <p className='title'>BLOG</p>
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
                            data?.blogs?.map((value, index) => {
                                return (
                                    <tr key={index} onClick={() => handleRowClick(value)}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value._id}</td>
                                        <td>{value.blog_title}</td>
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
            {renderModal()}
            <BsFillPlusCircleFill className='btn-add' onClick={handleButtonAddClick} />
        </div>
    );
}