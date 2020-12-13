import React,{useState,useEffect} from 'react';
import axios from "axios";
import Map from '../../components/Map/Map';
import classes from './Cafes.module.css'
import Dropdown from '../../components/UI/Dropdown/Dropdown'
import useDidMountEffect from "../../customHooks/useEffect/useDidMountEffect";

const Cafes = props => {
    const [startCoords,setStartCoords] = useState([]);
    const [endCoords,setEndCoords] = useState([]);
    const [data,setData] = useState(null);
    const [restaurants,setRestaurants] = useState([]);
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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(showLocation);
        axios.get('https://travelling-guide-ca721-default-rtdb.europe-west1.firebasedatabase.app/cafes.json')
            .then(res => {
                setRestaurants(res.data);
            })
    },[]);

    useDidMountEffect(() => {
        let startCoordinates = startCoords.join(",");
        let endCoordinates = endCoords.join(",");
        axios.get('https://api.openrouteservice.org/v2/directions/'+transport+'?api_key=5b3ce3597851110001cf6248c7928ceccc494b268b8f43ecfe4c0c2b&start='+startCoordinates+'&end='+endCoordinates)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[endCoords,transport]);


    const showLocation = (position) => {
        let koordinati = [position.coords.longitude,position.coords.latitude]
        setStartCoords(koordinati);
    }

    const finalLocationCoordsHandler = event => {
        let coords = event.target.value;
        coords = coords.split(',')
        let lat = parseFloat(coords[0]);
        let lon = parseFloat(coords[1]);
        coords = [lat,lon];
        setEndCoords(coords);

    }

    const changeTransportationHandler = event => {
        setTransport(event.target.value);
    }


    const calculateTime = () => {
        let duration = parseFloat(data.features[0].properties.summary.duration);
        let hours = duration/3600;
        hours = parseInt(hours);
        if(hours >= 1){
            let minutes = duration%3600;
            minutes = minutes/60;
            return hours+':'+parseInt(minutes)+'hours';
        }
        if(hours <= 0){
            let minutes = duration/60;
            minutes = parseInt(minutes);
            console.log(minutes)
            let seconds = duration-(minutes*60);
            console.log(seconds);
            if(minutes <= 0){
                return parseInt(seconds)+'seconds';
            }
            else{
                return minutes+':'+parseInt(seconds)+'minutes';
            }
        }
    }


    let showMap = null
    let showDistanceAndDuration = null;

    if(startCoords.length > 0 && endCoords.length > 0 && data != null){
        console.log(data.features[0].properties.summary.distance);
        let distance = parseFloat(data.features[0].properties.summary.distance);
        distance = distance/1000;
        distance = distance.toFixed(1);
        let duration = calculateTime();
        showDistanceAndDuration = (
            <React.Fragment>
                <label>Distance: <label className={classes.Label}>{distance}km</label></label>
                <br/>
                <label>Duration: <label className={classes.Label}>{duration}</label></label>
                <br/>
            </React.Fragment>
        );
        showMap = <Map startingPoints={startCoords} endPoints={endCoords} data={data}/>;

    }
    return (
        <div className={classes.Cafes}>
            <div className={classes.Box}>
                {startCoords.length === 0?
                    <p className={classes.Danger}>Enable your location to use the app , reload the page</p>:null}
                {showDistanceAndDuration}
                <label>Choose location for traveling:</label>
                <Dropdown disabled={startCoords.length === 0} options={restaurants} changeLocation={finalLocationCoordsHandler}/>
                <label>Choose your desired transportation:</label>
                <Dropdown disabled={startCoords.length === 0} changeTransport={changeTransportationHandler} transport={transportationMethods}/>
            </div>
            {showMap}
        </div>
    );
}

export default Cafes;