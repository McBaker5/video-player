import firebase from '../firebase/clientApp'
import Player from '../components/Player'
import React from 'react'

const Home = ({videoURLs}) =>{
  return(
  <div>
    {
       videoURLs.map((url) => (<Player key={url} videoURL={url} />))
    }
  </div>
  )
};

export const getServerSideProps = async () => {
  const db = firebase.firestore();
 
  //pulls all videos from the path and renders them as a single string
  var docRef = await db.collection("videos").get().then(q => q.docs.map(doc =>doc.data().videoPath));
  var videoURL = docRef.toString().split("\,"); // splits that string
 
  return{
      props: {
          videoURLs: videoURL,
      }
  }
};

export default Home;
