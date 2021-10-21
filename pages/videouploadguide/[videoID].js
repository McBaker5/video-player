import firebase from '../../firebase/clientApp'
import { Button, Checkbox, Input, Stack, CheckboxGroup, Select, FormControl, FormLabel, FormHelperText, useToast } from "@chakra-ui/react"
import React from 'react'
import ReactDOM from 'react-dom'
import EventSelect from '../../components/EventSelect.js'
import MacroCheckbox from '../../components/MacroCheckbox'
import MicroCheckbox from '../../components/MicroCheckbox'
import TitleInput from '../../components/TitleInput'
import DescriptionInput from '../../components/DescriptionInput'
import { updateMacroTag, updateMicroTag, updateEvent } from '../../firebase/videos'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router"

const videouploadguide = ({events, eventNames, microTags, microTagNames, macroTags, macroTagNames, vidID}) => {
    const router = useRouter()

    return (
        <>

        <FormControl>
            <FormLabel>Video title</FormLabel>
            <TitleInput vidID={vidID} />
            <FormHelperText>Title of video</FormHelperText>
            <FormLabel>Video description</FormLabel>
            <DescriptionInput vidID={vidID} />
            <FormHelperText>description of the video</FormHelperText>
            <FormLabel>Macro tags</FormLabel>
            <MacroCheckbox macroTags={macroTags} macroTagNames={macroTagNames} vidID={vidID} />
            <FormLabel>Micro tags</FormLabel>
            <MicroCheckbox microTags={microTags} microTagNames={microTagNames} vidID={vidID} />
            <FormLabel>Participate in event?</FormLabel>
            <EventSelect events={events} eventNames={eventNames} vidID={vidID} />
        </FormControl>

        </>
    )
}

export const getServerSideProps = async pageContext => {
    const vidID = pageContext.query.videoID;
    const db = firebase.firestore();
 
    //pulls all events from the path and renders them as a single string
    var docRef = await db.collection("events").get().then(q => q.docs.map(doc =>doc.data().ID));
    var events = docRef.toString().split("\,"); // splits that string
    docRef = await db.collection("events").get().then(q => q.docs.map(doc =>doc.data().name));
    var eventNames = docRef.toString().split("\,");
    docRef = await db.collection("microTags").get().then(q => q.docs.map(doc =>doc.data().ID));
    var microTags = docRef.toString().split("\,");
    docRef = await db.collection("microTags").get().then(q => q.docs.map(doc =>doc.data().name));
    var microTagNames = docRef.toString().split("\,");
    docRef = await db.collection("macroTags").get().then(q => q.docs.map(doc =>doc.data().ID));
    var macroTags = docRef.toString().split("\,");
    docRef = await db.collection("macroTags").get().then(q => q.docs.map(doc =>doc.data().name));
    var macroTagNames = docRef.toString().split("\,");
   
    return {
        props: {
            events: events,
            eventNames: eventNames,
            microTags: microTags,
            microTagNames: microTagNames,
            macroTags: macroTags,
            macroTagNames: macroTagNames,
            vidID: vidID,
        }
    }
};

export default videouploadguide;