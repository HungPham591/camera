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
