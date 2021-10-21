import React from 'react'
import { Button, Checkbox, Input, Stack, CheckboxGroup, Select } from "@chakra-ui/react"
import { updateMicroTag } from '../firebase/videos'

export default class MicroCheckbox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value    });
      }

    handleSubmit(event) {
        event.preventDefault();
        
        for (const [key, value] of Object.entries(this.state)) {
            if (value === true) {
                updateMicroTag(key, this.props.vidID);
            }
        } 
    }

    render() {
        var microTags = this.props.microTags
        var microTagNames = this.props.microTagNames
        var checkboxes = [];
        for (let i = 0; i < microTags.length; i++) {
            checkboxes[i] = <Checkbox key={microTags[i]} value={microTags[i]} name={microTags[i]} onChange={this.handleInputChange}>{microTagNames[i]}</Checkbox>;
        }

        return (
            <form>
                <label>
                <CheckboxGroup isRequired>
                    <Stack spacing={1} direction="column">
                        {
                            checkboxes  
                        }
                    </Stack>
                </CheckboxGroup>
                </label>
                <Button onClick={this.handleSubmit}>Submit</Button>
            </form>
        );
    }
}
// <input type="submit" value="Submit" /> // This is wrong idk why submit doesn't work right