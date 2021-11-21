import { useHistory } from "react-router";
import ShareModal from './ShareModal';
import { useState } from "react";
import { useMutation, useQuery } from '@apollo/client'
import { deleteFace } from '../../../graphql/face';
import { getUser } from '../../../graphql/user';

export default function ListFace(props) {
    let history = useHistory();

    const { loading, error, data } = useQuery(getUser);

    const [deleteItem, updateMutation] = useMutation(deleteFace)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteButton = (id) => {
        deleteItem({
            variables: { _id: id },
            refetchQueries: [{ query: getUser }]
        })
    };
    const handleShareButton = () => {
        handleShow();
    }
    return (
        <div>
            <ShareModal show={show} handleClose={handleClose} />
            <p className='title'>Hình ảnh</p>
            <button className='btn btn-primary' onClick={handleShareButton} style={{ marginTop: '1vh', marginBottom: '2vh' }}>Thêm mới</button>
            <div className='grid'>
                {
                    data?.user?.faces?.map((value, index) => {
                        const imgPath = `${process.env.REACT_APP_DOMAIN}\\face\\${data?.user?._id}\\${value?._id}.jpg`
                        return (
                            <div key={index} className='custom-card'>
                                <img src={imgPath} />
                                <p className='title'>{value.face_name}</p>
                                <div className='group-button'>
                                    <button
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
