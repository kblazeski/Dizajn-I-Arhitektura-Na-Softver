import React from 'react';
import classes from './Dropdown.module.css';

const dropdown = props => {
    let options = null;
    if(props.options != null){
        options = props.options.map(option => {
            let concatLatLon = option.lon+','+option.lat;
            return <option key={concatLatLon} value={concatLatLon}>{option.name}</option>
        })
    }
    return (
        <select onChange={props.changeLocation} size='5' className={classes.Dropdown}>
            {options}
        </select>
    );
}
export default dropdown;