import firebase from '../firebase/clientApp'
import Player from '../components/Player'
import React from 'react'

const Home = ({videoURL}) =>{
  return(
  <div>
    <Player videoURL={videoURL}/>
  </div>
  )
};

export const getServerSideProps = async (context) => {
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

export default Home;
