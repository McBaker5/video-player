import React from 'react'
import firebase from '../firebase/clientApp'
import { Button, Checkbox, Input, Stack, CheckboxGroup, Select } from "@chakra-ui/react"
import { updateTitle } from '../firebase/videos'

export default class TitleInput extends React.Component {
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
        updateTitle(this.state.value, this.props.vidID);
        //this.props.onSubmit(this.state.value);  
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>        
                <label>
                    <Input placeholder='Type title' value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}