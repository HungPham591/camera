import { useHistory } from "react-router";
import { getUser } from '../../../graphql/user';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { useEffect, useState } from "react";
import { deleteVideo } from '../../../graphql/video';
import { useMutation } from '@apollo/client';

export default function ListVideo(props) {
    let history = useHistory();
    const [deleteItem, deleteMutation] = useMutation(deleteVideo)
    const [camera, setCamera] = useState(null);

    const onCompleted = ({ user }) => {
        if (!user?.cameras?.length) return;
        setCamera(user?.cameras[0])
    }
    const { loading, error, data } = useQuery(getUser, { onCompleted });

    useEffect(() => {
        if (!camera && data?.user?.cameras?.length) setCamera(data?.user?.cameras[0]?._id);
    }, [])

    const handleWatchButton = (id) => {
        history.push("/Video/" + id);
    };
    const handleDeleteButton = (id) => {
        if (!id) return false;
        deleteItem({
            variables: { _id: id },
            refetchQueries: [{ query: getUser }]
        })
    }
    const handleDropdown = (e) => {
        setCamera(e.target.value);
    }
    const dropdown = () => {
        const listOption = data?.user?.cameras?.map((value, index) => {
            return <option key={index} value={value._id}>Video của camera {value.camera_name}</option>
        })
        return (
            <select onChange={handleDropdown}>
                {listOption}
            </select>
        );
    }
    const listVideo = () => {
        return data?.user?.cameras?.map((value, index) => {
            if (value?._id !== camera) return;
            return value?.videos?.map((value, index) => {
                const video_path = `${process.env.REACT_APP_DOMAIN}\\video\\${data?.user?._id}\\${value?.camera?._id}\\${value?.video_time}`;
                return (
                    <div key={index} className='custom-card'>
                        <video src={video_path} />
                        <div>
                            <p >{moment(value?.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                            <div className='group-button'>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleWatchButton(value._id)}
                                >
                                    Xem
                                </button>
                                <button
                                    className="btn btn-primary"
                                    style={{ marginLeft: "5%" }}
                                    onClick={() => handleDeleteButton(value?.camera?._id)}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>

                    </div>
                )
            })
        })
    }
    return (
        <div>
            <p className='title'>Video của bạn</p>
            {dropdown()}
            <div className='grid'>
                {listVideo()}
            </div>
        </div>
    )
}
