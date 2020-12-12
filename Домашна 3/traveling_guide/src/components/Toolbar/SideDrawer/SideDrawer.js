import React from 'react';
import NavigationItems from '../../Navigation/Navigation';
import classes from './SideDrawer.module.css';

const sideDrawer = props => {
    const applyClasses = [classes.SideDrawer,props.isOpen?classes.Open:classes.Close];
    return(
        <div className={applyClasses.join(" ")}>
            <NavigationItems/>
        </div>
    )
}
export default sideDrawer;