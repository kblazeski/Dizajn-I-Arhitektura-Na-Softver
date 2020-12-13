import React,{useState,useEffect} from 'react'
import Toolbar from './components/Toolbar/Toolbar'
import Restaurants from "./containers/Restaurants/Restaurants";
import classes from './App.module.css'
import {Switch,Redirect} from "react-router";
import {Route,BrowserRouter} from 'react-router-dom';
import SideDrawer from './components/Toolbar/SideDrawer/SideDrawer';
import Backdrop from './components/UI/Backdrop/Backdrop';
import Atms from "./containers/ATMs/Atms";
import Cafes from "./containers/Cafes/Cafes";
import Fuels from "./containers/Fuels/Fuels";
import Parkings from "./containers/Parkings/Parkings";



function App() {

    const [sideDrawerState,setSideDrawerState] = useState(false);
    const [startCoords,setStartCoords] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(showLocation);
    },[]);

    const showLocation = (position) => {
        let koordinati = [position.coords.longitude,position.coords.latitude]
        setStartCoords(koordinati);
    }

    const changeSideDrawerState = () => {
        setSideDrawerState(!sideDrawerState)
    }


    return (
        <div className={classes.App}>
            <BrowserRouter>
                <Toolbar changeSideDrawerState={changeSideDrawerState} />
                <SideDrawer isOpen={sideDrawerState}/>
                {sideDrawerState?<Backdrop changeSideDrawerState={changeSideDrawerState}/>:null}
                <Switch>
                    <Route exact path='/restaurants' render={() =>
                        <Restaurants startCoords={startCoords}/>
                    }/>
                    <Route path='/atms' render={() =>
                        <Atms startCoords={startCoords}/>
                    }/>
                    <Route path='/parking-lots' render={() =>
                        <Parkings startCoords={startCoords}/>
                    }/>
                    <Route path='/gas-stations' render={() =>
                        <Fuels startCoords={startCoords}/>
                    }/>
                    <Route path='/cafes' render={() =>
                        <Cafes startCoords={startCoords}/>
                    }/>
                    <Redirect to='/'/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
