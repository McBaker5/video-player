import VideoRecorder from 'react-video-recorder'
import React from 'react'
import { render } from 'react-dom'
import UploadFile from '../components/storage/UploadFile'
import Upload from './upload'
import firebase from '../firebase/clientApp'

export default function Recorder({docRef}) {

    const uploadFile = async ( file ) => {
      var docRef = firebase.firestore().collection('videos').doc() // leave as .doc() for a random unique doc name to be assigned
      //uploadToStorage(file)
      var storageRef = firebase.storage().ref('videos/' + docRef.id)
      // upload file
      await storageRef.put(file)
      // Add to firestore
      storageRef.getDownloadURL().then((url) => {
        docRef.set({
            description: 'testing firestore document creation when a video is uploaded',
            enabled: false,
            videoPath: url,
            ID: docRef.id,
            likeCount: 0,
            createdAt: firebase.firestore.Timestamp.now(),
            macroTagIDs: [],
            microTagIDs: [],
            title: 'Test',
        })
        .then(alert('Data was successfully sent to firestore'))
      })
    }


    return (
      <VideoRecorder timeLimit={60000} countdownTime={0} // mimeType={[".mp4",".hls",".mov"]}
      onRecordingComplete={videoBlob => {
        uploadFile(videoBlob)
      }}
    />
    );
  };