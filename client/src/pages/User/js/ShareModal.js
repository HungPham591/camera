import React, { useRef } from "react";
import { useMutation } from '@apollo/client'
import { createFace } from '../../../graphql/face';
import { useForm } from 'react-hook-form';
import { getUser } from '../../../graphql/user';
import axios from 'axios';

export default function CameraModal(props) {
    const refImg = useRef(null);
    const onCompleted = ({ createFace }) => {
        const fileName = createFace._id;
        let formData = new FormData();
        formData.append('img', refImg.current[0]);
        formData.append('file_name', fileName);
        axios.post(`${process.env.REACT_APP_DOMAIN}/uploadImg`, formData, { withCredentials: true });
    }
    const onError = () => {
    }

    const [createItem, updateMutation] = useMutation(createFace, { onCompleted, onError });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = ({ face_name, img }) => {
        createItem({
            variables: { face_name },
            refetchQueries: [{ query: getUser }]
        })
        refImg.current = img;
        props.handleClose();
    }
    return (
        <form className={'modal ' + (props.show ? '' : 'modal-hide')} onSubmit={handleSubmit(onSubmit)}>
            <div className='header'>
                <h4 className='title'>Setting</h4>
            </div>
            <div className='body'>
                <label className='label'>Name</label>
                <input type='text' {...register('face_name', { required: true })} placeholder='enter name' />
                <label className='label'>Image</label>
                <input type='file' {...register('img', { required: true })} />

            </div>
            <div className='footer'>
                <input type="submit" />
                <button type='button' onClick={props.handleClose}>Close</button>
            </div>
        </form>
    )
}
