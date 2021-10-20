import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactPlayer from 'react-player'
import firebase from '../firebase/clientApp'
import { ChakraProvider,Box,AspectRatio,Button} from "@chakra-ui/react"
import Icon from '../public/images/betterTriangle.png'

export default class Player extends React.Component{
constructor(props) {
super(props);

  this.state={
    playButtonClicked:true,
    elapsedTime:""
  };
  this.initPlayButton = this.initPlayButton.bind(this);
  this.handleSeek = this.handleSeek.bind(this);
}

stateChange = async () => {
  this.setState({
    [ReactPlayer.playing]: !this.state.playButtonClicked,
  });
}
//This is responsible for initing the seeker, and pausing the video.
initPlayButton= async (e)=>{
  e.preventDefault();
  this.playButtonClicked=!this.playButtonClicked;
  if(!this.elapsedTime )
     this.elapsedTime=0.0;
};

//This code seeks to the proper position of the video when resuming from a pause
handleSeek = async () => {
  this.player.seekTo(this.elapsedTime);
}

//This enables use of ReactPlayer methods.
ref = player =>{
  this.player = player
}

render = () => {
  return (
    <>
    <Head >
    <script async src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    </Head>
    <AspectRatio  ratio={1.9}>    
    <Box bg="black" h="100%" onClick={this.initPlayButton} >
        <div>
          <ReactPlayer url={ this.props.videoURL} playing={this.playButtonClicked }  onClick={this.stateChange} loop={true} controls={false} 
          playIcon={<button><img src="images/betterTriangle.png" width="50px" height="50px"/></button>}
          light={!this.playButtonClicked}
          onProgress={(played) => {this.elapsedTime = played.playedSeconds}}
          onPlay={this.handleSeek}
          ref ={this.ref}
        />
        </div>
    </Box>
    </AspectRatio>
    </>
  );
};
};

