import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import ReactPlayer from 'react-player'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzxbvIWzrZjFVFB_KXF-GSG689lwglHAA",
  authDomain: "step1-17c41.firebaseapp.com",
  databaseURL: "https://step1-17c41-default-rtdb.firebaseio.com",
  projectId: "step1-17c41",
  storageBucket: "step1-17c41.appspot.com",
  messagingSenderId: "660174949538",
  appId: "1:660174949538:web:5c2314c1b9b54b302b1bfb",
  measurementId: "G-GHTRB7457Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // This caused an error "ReferenceError: window is not defined"

export default function Home() {
  return (
    <div>
      <ReactPlayer url='https://www.youtube.com/watch?v=vwJbALuO-pM' />
    </div>
  )
}
