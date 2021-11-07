import { useHistory } from "react-router";
import { getUser } from '../../../graphql/user';
import { useQuery } from '@apollo/client';
import moment from 'moment';

export default function ListVideo(props) {
    let history = useHistory();
    const { loading, error, data } = useQuery(getUser);

    const handleWatchButton = (id) => {
        history.push("/Video/" + id);
    };
    const listVideo = () => {
        let videos = [];
        data?.user?.cameras?.forEach(value => {
            videos = [...value?.videos, ...videos]
        });
        return videos.map((value, index) => {
            const video_path = `${process.env.REACT_APP_DOMAIN}\\video\\${value?.camera?._id}_${value?.video_time}`;
            return (
                <div key={index} className='custom-card'>
                    <video src={video_path} />
                    <div>
                        <p className='title'>Camera {value?.camera?._id}</p>
                        <p >{moment(value?.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                        <div className='group-button'>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleWatchButton(value._id)}
                            >
                                Xem
                            </button>
                        </div>
                    </div>

                </div>
            )
        })
    }
    return (
        <div>
            <p className='title'>Video của bạn</p>
            <div className='grid'>
                {listVideo()}
            </div>
        </div>
    )
}
