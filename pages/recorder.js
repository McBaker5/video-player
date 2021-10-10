import VideoRecorder from 'react-video-recorder'
import React from 'react'

export default function Recorder({video}) {
    return (
      <VideoRecorder
      onRecordingComplete={(videoBlob) => {
        console.log('videoBlob', videoBlob)
      }}
    />
    
    )
  }
