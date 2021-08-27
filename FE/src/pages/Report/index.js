import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import callApi from "../../api/apiCaller";
import Nav from "../share/Nav";
import Footer from "../share/Footer";
import './css/index.scss'

export default function Report(props) {
    const [report, setReport] = useState({});
    const { id } = useParams();
    let report_path;

    const img_style = {
        width: "100vw",
        height: "94vh",
        zIndex: 0,
    };
    useEffect(() => {
        fetchReport();
    }, []);
    const fetchReport = async () => {
        let BODY = { _id: id };
        let report = await callApi("/report/", "GET", BODY);
        setReport(report);
        report_path = `http://localhost:4000/report/${report.camera_id}/${report.report_id}.jpg`;
    };
    return (
        <div id='Report'>
            <img src={report_path} style={img_style} alt=""></img>
        </div>
    );
}
