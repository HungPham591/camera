import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import './css/index.scss'

export default function Report(props) {
    const { id } = useParams();
    let report_path = `${process.env.REACT_APP_DOMAIN}\\report\\${id}.png`;

    const img_style = {
        width: "100vw",
        height: "94vh",
        zIndex: 0,
    };
    return (
        <div id='Report'>
            <img src={report_path} style={img_style} alt=""></img>
        </div>
    );
}
