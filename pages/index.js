import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import ReactPlayer from 'react-player'
import firebase from '../firebase/clientApp'

export const Home = ({ videoURL }) => {
  return (
    <div>
      <ReactPlayer url={ videoURL } />
    </div>
  );
};

export const getServerSideProps = async () => {
  const db = firebase.firestore();
  // Create a reference to a document in the videos collection
  var docRef = db.collection("videos").doc("nBbL35I9MXVZu0vsq7LL");
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
