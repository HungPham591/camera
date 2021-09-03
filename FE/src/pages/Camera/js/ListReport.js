import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import apiCaller from "../../../api/apiCaller";

export default function ListReport(props) {
    const [dataReport, setDataReport] = useState([]);

    let title = null;
    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {
        let BODY = { _id: id };
        let listReport = await apiCaller("/report/", "GET", BODY);
        setDataReport([...dataReport, ...listReport?.data]);
    };

    const openReport = (id) => {
        history.push("/Report/" + id);
    };
    return dataReport.map((value, index) => {
        let date = new Date(value.report_time);
        let datetime =
            date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        let fullPath = `${process.env.REACT_APP_DOMAIN}\\report\\${value._id}.png`;
        return (
            <div key={index} className="card">
                <img className="card-img-top" src={fullPath} alt="" />
                <div className="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">{datetime}</h6>
                    <button
                        className="btn btn-primary"
                        onClick={() => openReport(value._id)}
                    >
                        Xem
                    </button>
                </div>
            </div>
        );
    });
}
