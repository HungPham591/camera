import L from "leaflet";
import React, { useState, useEffect, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import { useHistory } from "react-router-dom";
import callApi from "../../../api/apiCaller";
import { connect } from "react-redux";

function Map(props) {
    const [dataCamera, setDataCamera] = useState([]);
    let history = useHistory();
    let mapObject;
    const greenIcon = (name) => {
        return L.divIcon({
            className: "my-custom-pin",
            iconAnchor: [0, 24],
            labelAnchor: [-6, 0],
            popupAnchor: [0, -36],
            html: `<span class="greenMarker"></span><div class='textMarker'>${name}</div>`,
        });
    };
    useEffect(() => {
        fetchCamera();
    }, []);
    useEffect(() => {
        initMap();
        loadMarker();
    }, [dataCamera]);
    const fetchCamera = async () => {
        let listCamera = await callApi("/camera/", "GET", null);
        setDataCamera(listCamera.data);
    };

    const openStream = (e) => {
        history.push("/Camera/" + e.sourceTarget.feature.properties._id);
    };

    const initMap = () => {
        document.getElementById("mapContainer").innerHTML =
            "<div id='map' style='width: 100%; height: 100%;'></div>";
        if (props.location.length === 0) {
            mapObject = L.map("map", {
                center: [10.030948595309376, 105.76856626550823],
                zoom: 18,
            });
        } else {
            mapObject = L.map("map", {
                center: props.location,
                zoom: 18,
            });
        }
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="http://' +
                'www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapObject);
    };
    const loadMarker = () => {
        if (dataCamera !== undefined && mapObject !== undefined) {
            dataCamera.forEach((value) => {
                let marker = L.marker(
                    [value.camera_location[0], value.camera_location[1]],
                    {
                        icon: greenIcon(value.camera_name),
                    }
                );
                marker.feature = {
                    type: "Point",
                    properties: {
                        _id: value._id,
                    },
                    geometry: undefined,
                };
                marker.addTo(mapObject).on("click", openStream);
            });
        }
    };

    return (
        <div id="mapContainer"></div>
    );
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
    };
};

export default connect(mapStateToProps)(Map);
