import React from 'react'
import Toolbar from './components/Toolbar/Toolbar'
import Restaurants from "./containers/Restaurants/Restaurants";
import classes from './App.module.css'
import {Switch,Redirect} from "react-router";
import {Route,BrowserRouter} from 'react-router-dom';


function App() {
    return (
        <div className={classes.App}>
            <BrowserRouter>
                <Toolbar/>
                <Switch>
                    <Route path='/restaurants' component={Restaurants}/>
                    <Redirect to='/'/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
