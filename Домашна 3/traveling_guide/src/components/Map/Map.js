import React from 'react'
import {MapContainer,Marker, TileLayer,GeoJSON} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import classes from './Map.module.css';
import hash from 'object-hash';

import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [24,36],
    iconAnchor: [12,36]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = props => {
    const startLocation = {
        lat: props.startingPoints[1], lng: props.startingPoints[0]
    }
    const endLocation = {
        lat: props.endPoints[1], lng: props.endPoints[0]
    }
    return(
        <div className={classes.Map}>
            <MapContainer center={startLocation} zoom={13} scrollWheelZoom={true} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={startLocation}/>
                <Marker position={endLocation}/>
                <GeoJSON key={hash(props.data)} data={props.data}/>
            </MapContainer>
        </div>
    );
}
export default Map;