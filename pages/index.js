import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import ReactPlayer from 'react-player'
import firebase from '../firebase/clientApp'
import { ChakraProvider,Box,AspectRatio} from "@chakra-ui/react"
import Hls from "hls.js"
import Icon from '../images/vprojectold-icon-ju-30_6.jpg'
import Icon2 from '../images/playbutton-2.png'
export const Home = ({ videoURL, corsControl }) => {

   
  return (
    <>
    <Head >
    <script async src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    </Head>
    <AspectRatio  ratio={1.9}>    
    <Box bg="black" h="100%">
        <div >
          <ReactPlayer url={ videoURL} playing={true} loop={true} controls={false} light={<Icon2></Icon2>} />
        </div>
    </Box>
    </AspectRatio>
    </>
  );
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
          corsControl: context.res.getHeader('Access-Control-Allow-Origin')
      }
  }
};

export default Home;
