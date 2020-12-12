import React,{useState,useEffect} from 'react'
import Toolbar from './components/Toolbar/Toolbar'
import Restaurants from "./containers/Restaurants/Restaurants";
import classes from './App.module.css'
import {Switch,Redirect} from "react-router";
import {Route,BrowserRouter} from 'react-router-dom';
import SideDrawer from './components/Toolbar/SideDrawer/SideDrawer';
import Backdrop from './components/UI/Backdrop/Backdrop';



function App() {

    const [sideDrawerState,setSideDrawerState] = useState(false);

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
                    <Route path='/restaurants' component={Restaurants}/>
                    <Redirect to='/'/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
