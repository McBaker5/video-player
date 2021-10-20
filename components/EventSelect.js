import React from 'react'
import firebase from '../firebase/clientApp'
import { Button, Checkbox, Input, Stack, CheckboxGroup, Select } from "@chakra-ui/react"

const EventSelect = ({events}) => {
    var options = events.map((el) => <option key={el}>{el}</option>); //// Check .map documentation to work with JSON like setOptions

    return (
        <div>
        <Select placeholder='Select event' id='event-select'>
            {
                options
            }
        </Select>
        </div>
    );
}

export default EventSelect;