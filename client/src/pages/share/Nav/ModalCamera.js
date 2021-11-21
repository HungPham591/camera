import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useRef, useState } from "react";
import { useQuery } from '@apollo/client'
import { getUser } from '../../../graphql/user';
import { useHistory } from "react-router";


function ModalCamera(props) {
    const history = useHistory();
    const dropdownRef = useRef(null)
    const { data } = useQuery(getUser);

    const dropdown = () => {
        const listOption = data?.user?.locations?.map((value, index) => {
            return <option key={index} value={value._id}>{value.location_name}</option>
        })
        return (
            <select ref={dropdownRef} style={{ width: '100%', borderRadius: '5px', padding: '0.5rem', outline: 'none', border: '1.8px solid #eee', backgroundColor: '#eee' }} >
                {listOption}
            </select>
        );
    }
    const handleButtonClick = () => {
        if (!dropdownRef.current?.value) return props.handleCloseCamera();
        history.push('/Location/' + dropdownRef.current?.value);
        props.handleCloseCamera();
    }

    return (
        <Modal
            show={props.showCamera}
            onHide={props.handleCloseCamera}
            style={{ zIndex: 9999 }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Thêm Camera vào địa điểm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {dropdown()}
            </Modal.Body>
            <div style={{ padding: '15px' }}>
                <Button variant="secondary" onClick={props.handleCloseCamera}>
                    Close
                </Button>
                <button className='btn btn-primary' style={{ marginLeft: '10px' }} onClick={handleButtonClick}>Add</button>
            </div>
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
