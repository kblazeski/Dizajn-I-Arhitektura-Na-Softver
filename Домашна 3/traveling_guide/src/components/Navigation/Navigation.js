import React from 'react'
import classes from './Navigation.module.css'
import NavigationItem from './NavigationItem/NavigationItem'


const Navigation = (props) => {
    return (
        <ul className={classes.Navigation}>
            <NavigationItem link='/restaurants' active>Restaurants</NavigationItem>
            <NavigationItem link='/cafes'>Cafes</NavigationItem>
            <NavigationItem link='/atms'>ATMs</NavigationItem>
            <NavigationItem link='/parking-lots'>Parking Lots</NavigationItem>
            <NavigationItem link='/gas-stations'>Gas Stations</NavigationItem>
        </ul>
    );
}
export default Navigation;