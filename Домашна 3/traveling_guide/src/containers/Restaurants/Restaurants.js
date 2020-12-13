import React,{useState,useEffect} from 'react';
import axios from "axios";
import Map from '../../components/Map/Map';
import classes from './Restaurants.module.css'
import Dropdown from '../../components/UI/Dropdown/Dropdown'
import useDidMountEffect from "../../customHooks/useEffect/useDidMountEffect";

const Restaurants = props => {
    const [startCoords,setStartCoords] = useState([]);
    const [endCoords,setEndCoords] = useState([]);
    const [data,setData] = useState(null);
    const [restaurants,setRestaurants] = useState([]);


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(showLocation);
        axios.get('https://travelling-guide-ca721-default-rtdb.europe-west1.firebasedatabase.app/restaurants.json')
            .then(res => {
                setRestaurants(res.data);
            })
    },[]);

    useDidMountEffect(() => {
        let startCoordinates = startCoords.join(",");
        let endCoordinates = endCoords.join(",");
        axios.get('https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248c7928ceccc494b268b8f43ecfe4c0c2b&start='+startCoordinates+'&end='+endCoordinates)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[endCoords]);


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

    let show = null
    if(startCoords.length > 0 && endCoords.length > 0 && data != null){
        show = <Map startingPoints={startCoords} endPoints={endCoords} data={data}/>
    }
    return (
        <div className={classes.Restaurants}>
            <div className={classes.Box}>
               <label>Choose location for traveling:</label>
              <Dropdown options={restaurants} changeLocation={finalLocationCoordsHandler}/>
                <label>Choose your desired transportation:</label>
                <Dropdown/>
            </div>
            {show}
        </div>
    );
}

export default Restaurants;