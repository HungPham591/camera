import React from "react";
import { useMutation } from '@apollo/client'
import { updateCamera, deleteCamera } from '../../../graphql/camera';
import { getUser } from '../../../graphql/user';
import { useForm } from 'react-hook-form';

export default function CameraModal(props) {
    const [updateItem, updateMutation] = useMutation(updateCamera)
    const [deleteItem, deleteMutation] = useMutation(deleteCamera)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        if (!props.camera?._id) return;
        data.camera_location = props.camera?.camera_location;
        data._id = props.camera?._id;
        updateItem({
            variables: data,
            refetchQueries: [{ query: getUser }]
        })
        props.handleClose();
    }

    const handleDeleteButton = () => {
        if (!props?.camera?._id) return
        deleteItem({
            variables: { _id: props?.camera?._id },
            refetchQueries: [{ query: getUser }]
        })
        props.handleClose();
    }
    return (
        <form className={'modal ' + (props.show ? '' : 'modal-hide')} onSubmit={handleSubmit(onSubmit)}>
            <div className='header'>
                <h4 className='title'>Setting</h4>
            </div>
            <div className='body'>
                <label className='label'>Camera name</label>
                <input type='text' {...register('camera_name', { required: true })} defaultValue={props.camera?.camera_name} />
                <label className='label'>Camera link</label>
                <input type='text' {...register('camera_link', { required: true })} defaultValue={props.camera?.camera_link} />
                <label className='label'>Camera location</label>
                <input type='text' {...register('camera_location')} defaultValue={props.camera?.camera_location} />
                <div style={{ display: 'flex', justifyContent: 'start', width: '100%', alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        defaultChecked={props.camera?.camera_public}
                        {...register('camera_public')}
                    />
                    <label className='label-checkbox'>public</label>
                </div>
            </div>
            <div className='footer'>
                <input type="submit" />
                <button type='button' onClick={handleDeleteButton}>Delete</button>
                <button type='button' onClick={props.handleClose}>Close</button>
            </div>
        </form>
    )
}
