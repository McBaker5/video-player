import VideoRecorder from 'react-video-recorder'
import React from 'react'
import { render } from 'react-dom'
//import uploadFile from '../firebase/uploadFile'
import { useRef, useState } from 'react'
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react"
import firebase from '../firebase/clientApp'

export default function Recorder({docRef}) {
  const inputFile = useRef(null)
  const [progressVal, setProgress] = useState(0)

  const uploadFile = async (file) => {

    //

//    var docRef = firebase.firestore().collection('videos').doc() // leave as .doc() for a random unique doc name to be assigned
    // create a storage ref to videos directory
    var storageRef = firebase.storage().ref('videos/' + 'test')//docRef.id)
    // upload file
    await storageRef.put(file).on('state_change',
      function progress(snapshot) {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      }
    )

    /**
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
            title: 'Test'
        })
        .then(alert('Data was successfully sent to firestore'))
    })
     */
  }





  const upload = () => {
      // get file
      var file = inputFile.current.files[0]
      uploadFile(file)
  }
  return (
    <div>
      <VideoRecorder timeLimit={60000} countdownTime={0} // mimeType={[".mp4",".hls",".mov"]}
      onRecordingComplete={videoBlob => {
        uploadFile(videoBlob)
      }}
    />
      <input type="file" onChange={upload} ref={inputFile} />
      <CircularProgress value={progressVal} size="120px" />
    </div>
  );
};