import React from "react";
import "leaflet/dist/leaflet.css";
import { connect } from "react-redux";
import "./css/index.scss";
import Nav from "../share/Nav";
import Footer from "../share/Footer";
import ListCamera from "./js/ListCamera";
import MapContainer from "./js/MapContainer";

function Map(props) {
    return (
        <>
            <Nav />
            <div id="Map">
                <div className="container-fluid">
                    <div className="row" style={{ height: "94vh" }}>
                        <div
                            className="col-lg-6 px-0"
                            style={{ overflowY: "scroll", height: "94vh" }}
                        >
                            <div style={{ padding: "3vh 2% 1vh 2%", overflowY: "scroll" }}>
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
                        </div>
                        <div className="col-lg-6 px-0">
                            <MapContainer />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
    };
};

export default connect(mapStateToProps)(Map);
