import firebase from '../firebase/clientApp'
import { Button, Checkbox, Input, Stack, CheckboxGroup, Select } from "@chakra-ui/react"
import React from 'react'
import ReactDOM from 'react-dom'
import EventSelect from '../components/EventSelect.js'
import MacroCheckbox from '../components/MacroCheckbox'
import MicroCheckbox from '../components/MicroCheckbox'

const videouploadguide = ({events, microTags, macroTags}) => {

    return (
        <>
        <h1>Video title</h1>
        <Input/>
        <p>Title of video</p>
        <h1>Video descripton</h1>
        <Input/>
        <p>description of the video</p>
        <h1>Macro Tags</h1>
        <MacroCheckbox macroTags={macroTags} />
        <h1>Micro Tags</h1>
        <MicroCheckbox microTags={microTags} />
        <h1>Participate in event?</h1>
        <EventSelect events={events} />
        <Button>Done</Button>
        </>
    )
}

export const getServerSideProps = async () => {
    const db = firebase.firestore();
 
    //pulls all videos from the path and renders them as a single string
    var docRef = await db.collection("events").get().then(q => q.docs.map(doc =>doc.data().name));
    var events = docRef.toString().split("\,"); // splits that string
    docRef = await db.collection("microTags").get().then(q => q.docs.map(doc =>doc.data().name));
    var microTags = docRef.toString().split("\,");
    docRef = await db.collection("macroTags").get().then(q => q.docs.map(doc =>doc.data().name));
    var macroTags = docRef.toString().split("\,");
   
    return {
        props: {
            events: events,
            microTags: microTags,
            macroTags: macroTags,
        }
    }
};

export default videouploadguide;