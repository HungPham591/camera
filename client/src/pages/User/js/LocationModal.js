import React, { useEffect, useRef } from "react";
import { useMutation } from '@apollo/client'
import { createLocation } from '../../../graphql/location';
import { useForm } from 'react-hook-form';
import { getUser } from '../../../graphql/user';
import axios from 'axios';
import { connect } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function LocationModal(props) {
    const markerLayer = useRef(null)
    const coordinate = useRef(null)
    const refImg = useRef(null);
    const mapObject = useRef(null);
    const onCompleted = ({ createLocation }) => {
        const fileName = createLocation._id;
        let formData = new FormData();
        formData.append('img', refImg.current[0]);
        formData.append('file_name', fileName);
        axios.post(`http://localhost:4008/uploadImg`, formData, { withCredentials: true });
    }
    const onError = (e) => {
        console.log(e)
    }
    const greenIcon = () => {
        return L.divIcon({
            className: "my-custom-pin",
            iconAnchor: [0, 24],
            labelAnchor: [-6, 0],
            popupAnchor: [0, -36],
            html: `<span class="greenMarker"></span>`,
        });
    };
    const [createItem, updateMutation] = useMutation(createLocation, { onCompleted, onError });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = ({ location_name, img }) => {
        if (!coordinate.current) return;
        const BODY = {
            location_coordinate: coordinate.current,
            location_name,
        }
        createItem({
            variables: BODY,
            refetchQueries: [{ query: getUser }]
        })
        refImg.current = img;
        props.handleClose();
    }
    const handleMapClick = (e) => {
        markerLayer.current.clearLayers();
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        coordinate.current = [lat, lng];
        console.log(coordinate.current)
        let marker = L.marker(
            coordinate.current,
            {
                icon: greenIcon(),
            }
        );
        marker.feature = {
            type: "Point",
            geometry: undefined,
        };
        marker.addTo(markerLayer.current)
    }
    const initMap = () => {
        if (props?.location)
            mapObject.current = L.map("map", {
                center: [props?.location[0], props?.location[1]],
                zoom: 18,
            });
        else
            mapObject.current = L.map("map", {
                center: [10.030948595309376, 105.76856626550823],
                zoom: 18,
            });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="http://' +
                'www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapObject.current);
        markerLayer.current = L.layerGroup([]).addTo(mapObject.current);
        mapObject.current.on('click', handleMapClick);
    }
    useEffect(() => {
        if (!mapObject?.current) initMap()
    }, [])
    return (
        <form className={'modal ' + (props.show ? '' : 'modal-hide')} onSubmit={handleSubmit(onSubmit)}>
            <div className='header'>
                <h4 className='title'>Setting</h4>
            </div>
            <div className='body'>
                <label className='label'>Name</label>
                <input type='text' {...register('location_name', { required: true })} placeholder='enter name' />
                <label className='label'>Image</label>
                <input type='file' {...register('img', { required: true })} />
                <div id="map"></div>
            </div>
            <div className='footer'>
                <input type="submit" />
                <button type='button' onClick={props.handleClose}>Close</button>
            </div>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        location: state.location
    };
};
export default connect(mapStateToProps)(LocationModal);
