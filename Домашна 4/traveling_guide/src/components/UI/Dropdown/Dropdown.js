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
    else if(props.transport){
        options = props.transport.array.map(option => {
            return <option key={option.value} value={option.value}>{option.name}</option>
        })
    }
    return (
        <select disabled={props.disabled} onChange={props.options?props.changeLocation:props.changeTransport}
                size='5' className={classes.Dropdown}>
            {options}
        </select>
    );
}
export default dropdown;