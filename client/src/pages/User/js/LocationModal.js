import React, { useRef } from "react";
import { useMutation } from '@apollo/client'
import { createLocation } from '../../../graphql/location';
import { useForm } from 'react-hook-form';
import { getUser } from '../../../graphql/user';
import axios from 'axios';
import { connect } from "react-redux";

function LocationModal(props) {
    const refImg = useRef(null);
    const onCompleted = ({ createLocation }) => {
        const fileName = createLocation._id;
        let formData = new FormData();
        formData.append('img', refImg.current[0]);
        formData.append('file_name', fileName);
        axios.post(`http://localhost:4007/uploadImg`, formData, { withCredentials: true });
    }
    const onError = (e) => {
        console.log(e)
    }

    const [createItem, updateMutation] = useMutation(createLocation, { onCompleted, onError });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = ({ location_name, img }) => {
        if (!props?.location) return;
        const BODY = {
            location_coordinate: props.location,
            location_name,
        }
        createItem({
            variables: BODY,
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
                <input type='text' {...register('location_name', { required: true })} placeholder='enter name' />
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

const mapStateToProps = (state) => {
    return {
        location: state.location
    };
};
export default connect(mapStateToProps)(LocationModal);
