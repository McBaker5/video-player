import VideoRecorder from 'react-video-recorder'
import React from 'react'
import { render } from 'react-dom'
import UploadFile from '../components/storage/UploadFile'
import Upload from './upload'
import firebase from '../firebase/clientApp'
import { collection, addDoc } from "firebase/firestore"; 

export default function Recorder({docRef}) {
    return (
      
      <VideoRecorder timeLimit={60000} countdownTime={0} // mimeType={[".mp4",".hls",".mov"]}
      onRecordingComplete={(videoBlob) => {
        const db = firebase.firestore();
        // Create a reference to a document in the videos collection
        var Ref = db.collection("uploads").doc("Q2TUSOl3xY2aB6jwVyz1")
        const docre =  addDoc(collection(Ref,"Video"),{
          Video:firebase.firestore.Blob.fromUint8Array(videoBlob)
        });
      }}
    />
    );
  };