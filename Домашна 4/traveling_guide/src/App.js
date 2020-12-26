import React,{useState,useEffect} from 'react'
import Toolbar from './components/Toolbar/Toolbar'
import classes from './App.module.css'
import {Switch,Redirect} from "react-router";
import {Route,BrowserRouter} from 'react-router-dom';
import SideDrawer from './components/Toolbar/SideDrawer/SideDrawer';
import Backdrop from './components/UI/Backdrop/Backdrop';
import MainBody from "./containers/MainBody";



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
                    <Route path="/:id" render={(props) => (
                        <MainBody key={props.match.params.id}  startCoords={startCoords} {...props} />)
                    } />
                    <Redirect to='/'/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
