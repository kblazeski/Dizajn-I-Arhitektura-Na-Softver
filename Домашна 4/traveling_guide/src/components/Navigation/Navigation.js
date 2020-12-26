import React from 'react'
import classes from './Navigation.module.css'
import NavigationItem from './NavigationItem/NavigationItem'


const Navigation = (props) => {
    return (
        <ul className={classes.Navigation}>
            <NavigationItem link='/restaurants' active>Restaurants</NavigationItem>
            <NavigationItem link='/cafes'>Cafes</NavigationItem>
            <NavigationItem link='/atms'>ATMs</NavigationItem>
            <NavigationItem link='/parkings'>Parking Lots</NavigationItem>
            <NavigationItem link='/fuels'>Gas Stations</NavigationItem>
        </ul>
    );
}
export default Navigation;