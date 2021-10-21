import React from 'react'
import firebase from '../firebase/clientApp'
import { Button, Checkbox, Input, Stack, CheckboxGroup, Select } from "@chakra-ui/react"
import { updateEvent } from '../firebase/videos'

export default class EventSelect extends React.Component {
    constructor(props) {
        super(props)

        //this.events = this.props.events
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleChange(event) {    
        this.setState({value: event.target.value});
        //this.props.onChange(this.state.value);  
    }
    handleSubmit(event) {
        alert('This should have been added: ' + this.state.value);
        event.preventDefault();
        updateEvent(this.state.value, this.props.vidID);
        //this.props.onSubmit(this.state.value);  
    }

    render() {
        var events = this.props.events
        var eventNames = this.props.eventNames
        var options = []//events.map((el) => <option key={el} value={el}>{eventName}</option>);
        for (let i = 0; i < events.length; i++) {
            options[i] = <option key={events[i]} value={events[i]}>{eventNames[i]}</option>;
        }
        return (
            <form onSubmit={this.handleSubmit}>        
                <label>
                    <Select placeholder='Select event' value={this.state.value} onChange={this.handleChange}>
                        {
                            options
                        }  
                    </Select>       
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
/**
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
*/