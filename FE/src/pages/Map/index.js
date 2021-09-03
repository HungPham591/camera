import React from "react";
import "leaflet/dist/leaflet.css";
import { connect } from "react-redux";
import "./css/index.scss";
import ListCamera from "./js/ListCamera";
import MapContainer from "./js/MapContainer";

function Map(props) {
    return (
        <div id="Map">
            <div className="left-pane">
                <p className='title'>Camera xung quanh đây</p>
                <div className='input-group'>
                    <div className='input'>
                        <input placeholder="Nhập tên camera" />
                        <button className='btn-search'>Search</button>
                    </div>
                    <button className='btn-img'>Hình ảnh</button>
                </div>
                <ListCamera />
            </div>
            <div className="right-pane">
                <MapContainer />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
    };
};

export default connect(mapStateToProps)(Map);
