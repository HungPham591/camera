import L from "leaflet";
import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useQuery, useMutation } from '@apollo/client';
import { getUser } from '../../graphql/user';
import { getLocation } from '../../graphql/location';
import { createCamera } from '../../graphql/camera';
import { useParams } from "react-router-dom";
import ListCamera from "./js/ListCamera";
import './css/index.scss'
import { useForm } from 'react-hook-form';
import { Modal, Button } from "react-bootstrap";
import Hls from 'hls.js';

export default function Location(props) {
    let { id } = useParams();
    const [createItem, createItemMutation] = useMutation(createCamera)
    const { data } = useQuery(getLocation, { variables: { _id: id } });
    const { data: userInfo } = useQuery(getUser);
    const hls = useRef(null);
    const mapObject = useRef(null);

    const currentCoordinate = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    useEffect(() => {
        console.log(1)
        if (!mapObject.current && data?.location) initCameraMap();
        if (data?.location?.cameras) loadCameraMarker();
    }, [data])


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
        return () => { hls.current?.destroy() }
    }, [])

    const handleMapClick = (e) => {
        //e.latlng.lng e.latlng.lat
        currentCoordinate.current = [e.latlng.lng, e.latlng.lat]
        handleShowModal();
    }
    const initCameraMap = () => {
        const imgPath = `http://localhost:4008/${data?.location?.user}/map/${id}.jpg`;

        mapObject.current?.off();
        mapObject.current?.remove();

        mapObject.current = L.map("map", { crs: L.CRS.Simple });
        const bounds = [[0, 0], [1000, 1000]];
        L.imageOverlay(imgPath, bounds).addTo(mapObject.current);
        mapObject.current.fitBounds(bounds);
        mapObject.current.on("click", handleMapClick)
    }

    const handleCameraMarker = (e) => {
        const id = e.sourceTarget.feature.properties._id;
        const user = e.sourceTarget.feature.properties.user;
        let videoSrc = `${process.env.REACT_APP_DOMAIN}\\${user}\\${id}\\stream\\index.m3u8`;
        const video = document.getElementById("videoPopup");
        if (Hls.isSupported()) {
            hls.current = new Hls();
            hls.current.loadSource(videoSrc);
            hls.current.attachMedia(video);
        }
    }
    const cameraPopup = () => `<div id='popup'><p>Xem camera</p><video id='videoPopup' crossOrigin="anonymous" controls autoPlay/></div>`;


    const loadCameraMarker = () => {
        if (!mapObject.current || !data?.location?.cameras) return;
        data?.location?.cameras.forEach((value) => {
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
                    user: value.user
                },
                geometry: undefined,
            };
            marker.addTo(mapObject.current).bindPopup(cameraPopup).on("click", handleCameraMarker);
        });
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (dataForm) => {
        dataForm.location = data?.location?._id;
        dataForm.camera_location = currentCoordinate.current;
        dataForm.google_token = userInfo?.user?.google_token;
        createItem({
            variables: dataForm,
            refetchQueries: [{ query: getUser }, { query: getLocation }]
        })
        handleCloseModal();
    }

    const modalCamera = () => {
        const title = [{ title: 'camera uri', value: 'camera_link' }, { title: 'camera name', value: 'camera_name' }]
        return (
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                style={{ zIndex: 9999 }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm Camera</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            title.map((value, index) =>
                            (
                                <div key={index} className="mb-3">
                                    <label className="form-label">{value.title}</label>
                                    <input
                                        className="form-control"
                                        {...register(value.value, { required: true })}
                                    />
                                </div>
                            )
                            )
                        }
                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                {...register('camera_public')}
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">
                                Public
                            </label>
                        </div>
                    </Modal.Body>
                    <div style={{ padding: '15px' }}>
                        <Button variant="secondary" onClick={props.handleCloseCamera}>
                            Close
                        </Button>
                        <input className='btn btn-primary' style={{ marginLeft: '10px' }} type='submit' />
                    </div>
                </form>
            </Modal>
        )
    }

    return (
        <div id="Location">
            <div className="left-pane">
                <div id="map"></div>
            </div>
            <div className="right-pane">
                <p className='title'>Bản đồ {data?.location?.location_name}</p>
                <ListCamera />
            </div>
            {modalCamera()}
        </div>
    );
}
