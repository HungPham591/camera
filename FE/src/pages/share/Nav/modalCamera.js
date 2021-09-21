import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useState } from "react";
// import { createCamera } from '../../../services/camera'
import { useMutation } from '@apollo/client'
import { createCamera, getCameras } from '../../../graphql/camera';
import { getUser } from '../../../graphql/user';
import { useForm } from 'react-hook-form';

function ModalCamera(props) {
    const [createItem, createMutation] = useMutation(createCamera)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        if (!props?.location) return;
        data.camera_location = props.location
        createItem({
            variables: data,
            refetchQueries: [{ query: getUser }]
        })
        props.handleCloseCamera();
    }

    const title = [{ title: 'camera uri', value: 'camera_link' }, { title: 'camera name', value: 'camera_name' }]
    return (
        <Modal
            show={props.showCamera}
            onHide={props.handleCloseCamera}
            style={{ zIndex: 9999 }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Camera</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        title.map((value, index) =>
                        (
                            <div key={index} className="mb-3">
                                <label className="form-label">{value.title}</label>
                                <input
                                    className="form-control"
                                    {...register(value.value, { required: true })}
                                />
                            </div>
                        )
                        )
                    }
                    <div className="form-group form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            {...register('camera_public')}
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            Public
                        </label>
                    </div>
                </Modal.Body>
                <div style={{ padding: '15px' }}>
                    <Button variant="secondary" onClick={props.handleCloseCamera}>
                        Close
                    </Button>
                    <input className='btn btn-primary' style={{ marginLeft: '10px' }} type='submit' />
                </div>
            </form>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        location: state.location
    };
};

export default connect(mapStateToProps)(ModalCamera);
