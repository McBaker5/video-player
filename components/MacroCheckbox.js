import React from 'react'
import { Button, Checkbox, Input, Stack, CheckboxGroup, Select } from "@chakra-ui/react"
import { updateMacroTag } from '../firebase/videos'

export default class MacroCheckbox extends React.Component {
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
                updateMacroTag(key, this.props.vidID);
            }
        } 
    }

    render() {
        var macroTags = this.props.macroTags
        var macroTagNames = this.props.macroTagNames
        var checkboxes = []
        for (let i = 0; i < macroTags.length; i++) {
            checkboxes[i] = <Checkbox key={macroTags[i]} value={macroTags[i]} name={macroTags[i]} onChange={this.handleInputChange}>{macroTagNames[i]}</Checkbox>;
        }
        //var checkboxes = macroTags.map((el) => <Checkbox key={el} value={el} name={el} onChange={this.handleInputChange}>{el}</Checkbox>);

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