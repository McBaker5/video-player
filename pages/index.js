import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import ReactPlayer from 'react-player'
import firebase from '../firebase/clientApp'
import { ChakraProvider,Box,AspectRatio,Button} from "@chakra-ui/react"
import Icon from '../images/playbutton-2.png'

export default class Home extends React.Component{
constructor(props) {
super(props);

  this.state={
    playButtonClicked:true,
    locked:false
  };
  this.initPlayButton = this.initPlayButton.bind(this);
}
stateChange = async () => {
  this.setState({
    [ReactPlayer.playing]: !this.state.playButtonClicked,
  });
}

  initPlayButton= async ()=>{
    this.playButtonClicked=!this.playButtonClicked;
  };

render = () => {
  return (
    <>
    <Head >
    <script async src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    </Head>
    <AspectRatio  ratio={1.9}>    
    <Box bg="black" h="100%" onClick={this.initPlayButton}>
        <div >
          <ReactPlayer url={ this.props.videoURL} playing={this.playButtonClicked}  onClick={this.stateChange} loop={true} controls={false}  light={Icon.toString() } />
        </div>
    </Box>
    </AspectRatio>
    </>
  );
};
};

export const getServerSideProps = async (context) => {
  context.res.setHeader('Access-Control-Allow-Origin','*')
  const db = firebase.firestore();
  // Create a reference to a document in the videos collection
  var docRef = db.collection("videos").doc("7OKfHl2p3hhbdd9MmK8i");
  var videoURL;
  // Retrieve the video URL from the document
  await docRef.get().then((doc) => {   
      videoURL = (doc.data().videoPath);
  });
  // Set videoURL prop to the URL
  return{
    
      props: {
          videoURL: videoURL,
      }
  }
};

// // export default Home;
