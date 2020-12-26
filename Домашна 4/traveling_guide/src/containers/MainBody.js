import React,{useState,useEffect} from 'react';
import axios from "axios";
import Map from '../components/Map/Map';
import classes from './MainBody.module.css'
import Dropdown from '../components/UI/Dropdown/Dropdown'
import useDidMountEffect from "../customHooks/useEffect/useDidMountEffect";

const MainBody = props => {
    const [endCoords,setEndCoords] = useState([]);
    const [mapData,setMapData] = useState(null);
    const [options,setOptions] = useState([]);
    const [transport,setTransport] = useState('driving-car');

    const transportationMethods = {
        array: [
            {
                name: 'Car',
                value: 'driving-car'
            },
            {
                name: 'Bycycle',
                value: 'cycling-regular'
            },
            {
                name: 'On foot',
                value: 'foot-walking'
            }
        ]
    }

    // Ovaa funckija(hook) se izvrshuva na pochetok , i koga kje se promeni :id-to ili
    // linkot kako restaurants , parkings itn , vnatre vo funkcijata gi zemame podatocite
    // za odredena opcija(restorani,parkinzi itn.) od baza na cloud i gi stavame vo promenlivata
    // options

    useEffect(() => {
        axios.get('https://travelling-guide-ca721-default-rtdb.europe-west1.firebasedatabase.app/'+props.match.params.id+'.json')
            .then(res => {
                setOptions(res.data);
            })
    },[props.match.params.id]);

    // Ovaa funckija se izvrshuva samo koga ima promena na endCoords i transport pa zatoa napravivme
    // dopolnitelen custom made hook , gi zemame coordinatite gi pravme vo string i gi stavame
    // vo funkcijata kade shto so axios.get se zemaat podatocite kako rutiranje za da se iscrtaat na
    // mapata.

    useDidMountEffect(() => {
        let startCoordinates = props.startCoords.join(",");
        let endCoordinates = endCoords.join(",");
        axios.get('https://api.openrouteservice.org/v2/directions/'+transport+'?api_key=5b3ce3597851110001cf6248c7928ceccc494b268b8f43ecfe4c0c2b&start='+startCoordinates+'&end='+endCoordinates)
            .then(res => {
                setMapData(res.data);
            })
            .catch(err => {
            })
    },[endCoords,transport]);


    //So ovaa funkcija , koga kje se promeni dadenata opcija na primer vo restoranite
    // gi zema kordinatite od odberenata opcija , gi parsira vo broevi i gi stava vo state-ot

    const finalLocationCoordsHandler = event => {
        let coords = event.target.value;
        coords = coords.split(',')
        let lat = parseFloat(coords[0]);
        let lon = parseFloat(coords[1]);
        coords = [lat,lon];
        setEndCoords(coords);

    }

    //Ovaa funkcija na promena na transportot , go menuva statot na transport

    const changeTransportationHandler = event => {
        setTransport(event.target.value);
    }


    //Ovaa funkcija za dadeni sekundi gi pravi vo chasovi , minuti i vrakja soodvetno
    // chasovi i minuti , ili minuti i sekundi

    const calculateTime = () => {

        let duration = parseInt(mapData.features[0].properties.summary.duration);
        let hours = Math.floor(duration / 3600);
        duration %= 3600;
        let minutes = Math.floor(duration / 60);
        let seconds = duration % 60;

        minutes = String(minutes).padStart(2, "0");
        hours = String(hours).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        if(hours > 0){
            return hours+':'+minutes+' hours';
        }
        return minutes+':'+seconds+' minutes';
    }

    //Ovaa funkcija za dadeni distanca vo metri gi pravi vo kilometri  i vrakja soodvetno
    // kilometri , ili metri dokolku imame pomalku od 1000metri

    const calculateDistance = () => {
        let distanceInMeters = parseFloat(mapData.features[0].properties.summary.distance);
        let distanceInKm = distanceInMeters/1000;
        distanceInKm = distanceInKm.toFixed(1);
        if(distanceInKm >= 1)
            return distanceInKm+' km';
        return distanceInMeters.toFixed(1)+' m';
    }


    let showMap = null
    let showDistanceAndDuration = null;

    // Ovde proveruvame dali kordinatite ne se 0 , i dali e zemena rutirackite podatoci od API-to
    // za da se iscrta na mapata , dokolku se tuka , merime distanca i vreme traenje na patuvanje
    // i samo togash gi pokazhuvame na stranata

    if(props.startCoords.length > 0 && endCoords.length > 0 && mapData != null){

        let distance = calculateDistance();
        let duration = calculateTime();
        showDistanceAndDuration = (
            <React.Fragment>
                <label>Distance: <label className={classes.Label}>{distance}</label></label>
                <br/>
                <label>Duration: <label className={classes.Label}>{duration}</label></label>
                <br/>
            </React.Fragment>
        );
        showMap = <Map startingPoints={props.startCoords} endPoints={endCoords} data={mapData}/>;

    }
    return (
        <div className={classes.MainBody}>
            <div className={classes.Box}>
                {props.startCoords.length === 0?
                    <p className={classes.Danger}>Enable your location to use the app , reload the page</p>:null}
                {showDistanceAndDuration}
                <label>Choose location for traveling:</label>
                <Dropdown disabled={props.startCoords.length === 0}
                          options={options} changeLocation={finalLocationCoordsHandler}/>
                <label>Choose your desired transportation:</label>
                <Dropdown disabled={props.startCoords.length === 0 || endCoords.length === 0}
                          changeTransport={changeTransportationHandler}
                          transport={transportationMethods}/>
            </div>
            {showMap}
        </div>
    );
}

export default MainBody;