import VideoRecorder from 'react-video-recorder'
import React from 'react'
import { render } from 'react-dom'
import { useRef, useState } from 'react'
import { CircularProgress, IconButton, Input, AspectRatio, Flex, Center, Button, AlertDialog, AlertDialogOverlay, AlertDialogBody, AlertDialogContent } from "@chakra-ui/react"
import firebase from '../firebase/clientApp'
import Video from '../components/Video'
import { useRouter } from "next/router"

export default function Upload() {
  const router = useRouter()
  const inputFile = useRef(null)
  const [progressVal, setProgress] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()
  const [isRecording, setIsRecording] = useState(false)

  const uploadFile = async (file) => {
    var docRef = firebase.firestore().collection('videos').doc() // leave as .doc() for a random unique doc name to be assigned
    // create a storage ref to videos directory
    var storageRef = firebase.storage().ref('videos/' + docRef.id)
    setIsOpen(true) // Open progress display
    // upload file
    var uploadTask = storageRef.put(file)
    uploadTask.on('state_change',
      function progress(snapshot) {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        if ((snapshot.bytesTransferred / snapshot.totalBytes) === 1) {
            setIsOpen(false) // Close progress display when upload is complete
        }
      }
    )
    await uploadTask

    // Add to firestore
    await storageRef.getDownloadURL().then((url) => {
        docRef.set({
            description: '',
            enabled: false,
            videoPath: url, // The download url of the video in storage
            ID: docRef.id,  // The unique id of the document
            likeCount: 0,
            createdAt: firebase.firestore.Timestamp.now(),
            macroTagIDs: [],
            microTagIDs: [],
            title: ''
        })
    })

    router.push("./videouploadguide/" + docRef.id)
  }

    const uploadFromButton = () => {
        // get file
        var file = inputFile.current.files[0]
        uploadFile(file)
    }
    return (
        <>
        <Center> 
            <Flex direction='column'>
                <AspectRatio ratio={.6 / 1}>
                        <VideoRecorder timeLimit={60000} countdownTime={0} isOnInitially={true} //ref={this.videoRecorderRef} // mimeType={[".mp4",".hls",".mov"]}
                        onRecordingComplete={videoBlob => {
                            uploadFile(videoBlob)
                        }}
                        />
                </AspectRatio>
                <Flex background='green.200' justifyContent='space-between' display='flex'>
                    <Button>Record</Button>
                    <Input type="file" onChange={uploadFromButton} ref={inputFile} accept=".mp4, .webm, .mov, .mkv" />
                </Flex>
            </Flex> 
        </Center>

        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} closeOnEsc={false} closeOnOverlayClick={false} isCentered >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <Center>
                     <CircularProgress value={progressVal} size="120px" />
                    </Center>
                    <AlertDialogBody>
                        <Center>Uploading</Center>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>
    );
};