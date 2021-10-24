import React, { useState } from 'react';
import './css/index.scss';
import { IoIosArrowForward } from 'react-icons/io';
import Camera from './js/Camera';
import Report from './js/Report';
import User from './js/User';
import Video from './js/Video';
import Dashboard from './js/Dashboard';
import { useHistory } from "react-router-dom";

export default function Admin() {
    const history = useHistory();
    const [selected, setSelected] = useState(0);
    const listMenu = ['Home', 'Camera', 'User', 'Report', 'Video', 'Logout'];
    const handleSelectMenu = (id) => {
        if (id === 5) history.replace('/');
        else setSelected(id);
    }
    const showDashboard = () => {
        const listDashboard = {
            0: <Dashboard />,
            1: <Camera />,
            2: <User />,
            3: <Report />,
            4: <Video />
        }
        return listDashboard[selected];
    }
    return (
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
                <p className='made-by'>Made by Pham Thanh Hung</p>
            </div>
            <div className='right-pane'>
                {showDashboard()}
            </div>
        </div>
    )
}