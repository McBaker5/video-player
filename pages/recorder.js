import VideoRecorder from 'react-video-recorder'
import React from 'react'
import { render } from 'react-dom'
import uploadFile from '../firebase/uploadFile'

export default function Recorder({docRef}) {
    return (
      <VideoRecorder timeLimit={60000} countdownTime={0} // mimeType={[".mp4",".hls",".mov"]}
      onRecordingComplete={videoBlob => {
        uploadFile(videoBlob)
      }}
    />
    );
  };