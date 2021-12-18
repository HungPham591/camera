import L from "leaflet";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { connect } from "react-redux";
import { useQuery } from '@apollo/client';
import { getUser } from '../../../graphql/user';

import Hls from 'hls.js';

function Map(props) {
    const { data } = useQuery(getUser);
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
    const addMapTitle = (title) => {
        let legend = L.control({ position: "topleft" });
        legend.onAdd = () => {
            let div = L.DomUtil.create('div', 'legend');
            div.innerHTML = `<p>Bản đồ ${title}</p>`;
            return div;
        }
        legend.addTo(mapObject.current);
    }
    useEffect(() => {
        if (!mapObject?.current) initLocationMap();
        return () => { hls.current?.destroy() }
    }, []);
    useEffect(() => {
        loadLocationMarker();
    }, [data]);
    const handleButtonBack = () => {
        initLocationMap();
        loadLocationMarker();
        document.getElementsByClassName('right-pane')[0].className = 'right-pane'
    }
    const initLocationMap = () => {
        mapObject.current?.off();
        mapObject.current?.remove();
        if (props.location.length === 0) {
            mapObject.current = L.map("map", {
                center: [10.030948595309376, 105.76856626550823],
                zoom: 18,
            });
        } else {
            mapObject.current = L.map("map", {
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
    const initCameraMap = (id, name) => {
        const imgPath = ` http://localhost:4008/${data?.user?._id}/map/${id}.jpg`

        mapObject.current?.off();
        mapObject.current?.remove();

        mapObject.current = L.map("map", { crs: L.CRS.Simple, zoomControl: false });
        const bounds = [[0, 0], [1000, 1000]];
        L.imageOverlay(imgPath, bounds).addTo(mapObject.current);
        mapObject.current.fitBounds(bounds);

        addMapTitle(name)
        loadCameraMarker(id);
    }
    const handleLocationMarker = (e) => {
        const id = e.sourceTarget.feature.properties._id;
        const name = e.sourceTarget.feature.properties.name;
        document.getElementsByClassName('right-pane')[0].className = 'right-pane right-pane-active'
        initCameraMap(id, name);
    };
    const handleCameraMarker = (e) => {
        const id = e.sourceTarget.feature.properties._id;
        let videoSrc = `${process.env.REACT_APP_DOMAIN}\\${data?.user?._id}\\${id}\\stream\\index.m3u8`;
        const video = document.getElementById("videoPopup");
        if (Hls.isSupported()) {
            hls.current = new Hls();
            hls.current.loadSource(videoSrc);
            hls.current.attachMedia(video);
        }
    }
    const cameraPopup = () => `<div id='popup'><p>Xem camera</p><video id='videoPopup' crossOrigin="anonymous" controls autoPlay/></div>`;

    const loadLocationMarker = () => {
        if (!mapObject.current || !data?.user?.locations) return;
        data?.user?.locations.forEach((value) => {
            let marker = L.marker(
                [value.location_coordinate[0], value.location_coordinate[1]],
                {
                    icon: greenIcon(value.location_name),
                }
            );
            marker.feature = {
                type: "Point",
                properties: {
                    _id: value._id,
                    name: value.location_name
                },
                geometry: undefined,
            };
            marker.addTo(mapObject.current).on("click", handleLocationMarker);
        });
    };
    const loadCameraMarker = (id) => {
        if (!mapObject.current || !data?.user?.cameras) return;
        data?.user?.cameras.forEach((value) => {
            if (value?.location !== id) return;
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
            marker.addTo(mapObject.current).bindPopup(cameraPopup).on("click", handleCameraMarker);
        });
    }

    return (
        <div id='mapContainer'>
            <div id="map"></div>
            <button onClick={handleButtonBack} style={{ right: 10, top: 10 }}>Back</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
    };
};

export default connect(mapStateToProps)(Map);
