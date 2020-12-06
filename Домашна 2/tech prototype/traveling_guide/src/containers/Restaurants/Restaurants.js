import React,{useState,useEffect} from 'react';
import axios from "axios";
import Map from '../../components/Map/Map';
import classes from './Restaurants.module.css'
import Dropdown from '../../components/UI/Dropdown/Dropdown'


const Restaurants = props => {
    const [startCoords,setStartCoords] = useState([]);
    const [endCoords,endSetCoords] = useState([]);
    const [data,setData] = useState({})

    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(showLocation);
        axios.get('https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248c7928ceccc494b268b8f43ecfe4c0c2b&start=8.681495,49.41461&end=8.687872,49.420318')
            .then(res => {
                setData(res.data);
                let startingCoordinates = [res.data.bbox[1],res.data.bbox[0]];
                let endingCoordinates = [res.data.bbox[3],res.data.bbox[2]];
                setStartCoords(startingCoordinates);
                endSetCoords(endingCoordinates)
                console.log(res.data);
            })


    },[])

    // const showLocation = (position) => {
    //     console.log(position.coords.latitude,position.coords.longitude)
    //     let koordinati = [position.coords.latitude,position.coords.longitude]
    //     setStartCoords(koordinati);
    // }

    let show = null
    if(startCoords.length > 0 && endCoords.length && data != null){
        show = <Map startingPoints={startCoords} endPoints={endCoords} data={data}></Map>
    }
    return (
        <div className={classes.Restaurants}>
            <div className={classes.Box}>
               <label>Choose location for traveling:</label>
              <Dropdown/>
                <label>Choose your desired transportation:</label>
                <Dropdown/>
            </div>
            {show}
        </div>
    );
}

export default Restaurants;