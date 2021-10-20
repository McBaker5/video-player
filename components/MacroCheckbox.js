import React from 'react'
import firebase from '../firebase/clientApp'
import { Button, Checkbox, Input, Stack, CheckboxGroup, Select } from "@chakra-ui/react"

const MacroCheckbox = ({macroTags}) => {
    var checkboxes = macroTags.map((el) => <Checkbox key={el}>{el}</Checkbox>); //// Check .map documentation to work with JSON like setOptions

    return (
        <div>
            <CheckboxGroup colorScheme="green">
                <Stack spacing={1} direction="column">
                    {
                        checkboxes
                    }
                </Stack>
            </CheckboxGroup>
        </div>
    );
}

export default MacroCheckbox;