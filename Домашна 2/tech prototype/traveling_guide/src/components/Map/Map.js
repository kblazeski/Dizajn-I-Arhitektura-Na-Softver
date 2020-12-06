import React from 'react'
import {MapContainer,Marker, TileLayer,GeoJSON} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import classes from './Map.module.css';

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
    return(
        <div className={classes.Map}>
            <MapContainer center={props.startingPoints} zoom={103} scrollWheelZoom={true} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON data={props.data}/>
                <Marker position={props.startingPoints}/>
                <Marker position={props.endPoints}/>
            </MapContainer>
        </div>
    );
}
export default Map;