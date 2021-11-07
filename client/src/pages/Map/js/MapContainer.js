import L from "leaflet";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { connect } from "react-redux";
import { useQuery } from '@apollo/client';
import { getCameras } from '../../../graphql/camera';

import Hls from 'hls.js';

function Map(props) {
    const { loading, error, data } = useQuery(getCameras);
    const hls = useRef(null);
    const mapObject = useRef(null);

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
        if (!mapObject?.current) initMap();
        return () => { hls.current?.destroy() }
    }, [])
    useEffect(() => {
        loadMarker();
    }, [data]);

    const initMap = () => {
        if (props.location.length === 0) {
            mapObject.current = L.map("mapContainer", {
                center: [10.030948595309376, 105.76856626550823],
                zoom: 18,
            });
        } else {
            mapObject.current = L.map("mapContainer", {
                center: props.location,
                zoom: 18,
            });
        }
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="http://' +
                'www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapObject.current);
    };
    const showPopup = (e) => {
        const id = e.sourceTarget.feature.properties._id;
        let videoSrc = `${process.env.REACT_APP_DOMAIN}\\stream\\${id}\\index.m3u8`;
        const video = document.getElementById("videoPopup");
        if (Hls.isSupported()) {
            hls.current = new Hls();
            hls.current.loadSource(videoSrc);
            hls.current.attachMedia(video);
        }
    };
    const popup = () => `<video id='videoPopup' crossOrigin="anonymous" controls autoPlay/>`
    const loadMarker = () => {
        if (!mapObject.current || !data?.cameras) return;
        data.cameras.forEach((value) => {
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
            marker.addTo(mapObject.current).bindPopup(popup).on("click", showPopup);
        });
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
