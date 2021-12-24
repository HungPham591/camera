import React, { useState } from 'react';
import './css/index.scss';
import { IoIosArrowForward } from 'react-icons/io';
import Camera from './js/Camera';
import Report from './js/Report';
import User from './js/User';
import Video from './js/Video';
import Dashboard from './js/Dashboard';
import UserDetail from './js/UserDetail';
import CameraDetail from './js/CameraDetail';
import Blog from './js/Blog';
import { useHistory } from "react-router-dom";
import { getUser } from '../../graphql/user';
import { useQuery } from '@apollo/client'

export const SelectPageContext = React.createContext(null);

export default function Admin() {
    const { loading, error, data } = useQuery(getUser);

    const [user, setUser] = useState(null);
    const [camera, setCamera] = useState(null);

    const history = useHistory();
    const [selected, setSelected] = useState(0);
    const listMenu = ['Home', 'User', 'Camera', 'Report', 'Video', 'Blog', 'Logout'];
    const handleSelectMenu = (id) => {
        if (id === 6) history.replace('/');
        else setSelected(id);
    }
    const showDashboard = () => {
        const listDashboard = {
            0: <Dashboard />,
            1: <User />,
            2: <Camera />,
            3: <Report />,
            4: <Video />,
            5: <Blog />,
            7: <UserDetail />,
            8: <CameraDetail />
        }
        return listDashboard[selected];
    }
    return (
        <SelectPageContext.Provider value={{ setPageSelected: setSelected, user, camera, setUser, setCamera }}>
            <div id='Admin'>
                <div className='left-pane'>
                    <p className='title'>ADMIN PAGE</p>
                    <ul>
                        {
                            listMenu.map((value, index) =>
                                <li key={index} className={index === selected ? 'selected' : ''} onClick={() => handleSelectMenu(index)}><p>{value}</p><IoIosArrowForward className='arrow' /></li>
                            )
                        }
                    </ul>
                    <p className='made-by'>{data?.user?.user_name}</p>
                </div>
                <div className='right-pane'>
                    {showDashboard()}
                </div>
            </div>
        </SelectPageContext.Provider>
    )
}