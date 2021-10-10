import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import ReactPlayer from 'react-player'
import firebase from '../firebase/clientApp'
import { render } from 'react-dom'
import VideoRecorder from 'react-video-recorder'
export default function Home() {
  return (
    <VideoRecorder
    rederActions={actionButton => {
        <actionButton>d</actionButton>
    }}
    // onRecordingComplete={videoBlob => {

    //   console.log('videoBlob', videoBlob)
      
    // }}
  />
  
  )
}

// export async function getServerSideProps(context) {
//   return{
//    // props: {rederActions},
//   }
// }

// render(<Home />, document.getElementById('root'))