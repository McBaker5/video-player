import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import ReactPlayer from 'react-player'
import firebase from '../firebase/clientApp'
import { Flex, Spacer } from "@chakra-ui/react"

export const Home = ({ videoURL }) => {
  return (
    <Flex alignItems='center'>
    <div>
      <ReactPlayer url={ videoURL } playing={true} loop={true} />
    </div>
    </Flex>
  );
};

export const getServerSideProps = async () => {
  const db = firebase.firestore();
  // Create a reference to a document in the videos collection
  var docRef = db.collection("videos").doc("WeSIVSdvukD29ZhiFLPQ");
  var videoURL;
  // Retrieve the video URL from the document
  await docRef.get().then((doc) => {   
      videoURL = (doc.data().videoPath);
  });
  // Set videoURL prop to the URL
  return{
      props: {
          videoURL: videoURL
      }
  }
};

export default Home;
