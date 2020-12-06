import React from 'react';
import classes from './Dropdown.module.css';

const dropdown = props => {
    let options = null;
    if(props.options != null){
        options = props.options.map(option => {
            return <option key={option.id} value={option.value}>{option.name}</option>
        })
    }
    return (
        <select size='5' className={classes.Dropdown}>
            {options}
            {/*ovie ovde kje se brishat*/}
            <option>Ресторан 1</option>
            <option>Ресторан 2</option>
            <option>Ресторан 3</option>
            <option>Ресторан 4</option>
            <option>Ресторан 1</option>
            <option>Ресторан 2</option>
            <option>Ресторан 3</option>
            <option>Ресторан 4</option>
            <option>Ресторан 2</option>
            <option>Ресторан 3</option>
            <option>Ресторан 4</option>
            <option>Ресторан 1</option>
            <option>Ресторан 2</option>
            <option>Ресторан 3</option>
            <option>Ресторан 4</option>


        </select>
    );
}
export default dropdown;