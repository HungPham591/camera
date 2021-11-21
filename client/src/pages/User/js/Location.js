import { useHistory } from "react-router";
import LocationModal from './LocationModal';
import { useState } from "react";
import { useMutation, useQuery } from '@apollo/client'
import { deleteLocation } from '../../../graphql/location';
import { getUser } from '../../../graphql/user';

export default function ListLocation(props) {
    let history = useHistory();

    const { loading, error, data } = useQuery(getUser);

    const [deleteItem, updateMutation] = useMutation(deleteLocation)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteButton = (id) => {
        deleteItem({
            variables: { _id: id },
            refetchQueries: [{ query: getUser }]
        })
    };
    const handleWatchButton = (_id) => {
        history.push('/Location/' + _id);
    }
    const handleShareButton = () => {
        handleShow();
    }
    return (
        <div>
            <LocationModal show={show} handleClose={handleClose} />
            <p className='title'>Địa điểm</p>
            <button className='btn btn-primary' onClick={handleShareButton} style={{ marginTop: '1vh', marginBottom: '2vh' }}>Thêm mới</button>
            <div className='grid'>
                {
                    data?.user?.locations?.map((value, index) => {
                        const imgPath = ` http://localhost:4008/map/${data?.user?._id}/${value?._id}.jpg`
                        return (
                            <div key={index} className='custom-card'>
                                <img src={imgPath} />
                                <p className='title'>{value.location_name}</p>
                                <div className='group-button'>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleWatchButton(value._id)}
                                    >
                                        Xem
                                    </button>
                                    <button
                                        style={{ marginLeft: '6%' }}
                                        className="btn btn-primary"
                                        onClick={() => handleDeleteButton(value._id)}
                                    >
                                        Xóa
                                    </button>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
