import React from 'react'
import Navigation from "../Navigation/Navigation";
import classes from './Toolbar.module.css'

const Toolbar = (props) => {
    return (
       <div className={classes.Toolbar}>
           <Navigation/>
       </div>
    );
}

export default Toolbar
