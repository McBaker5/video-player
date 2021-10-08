import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import ReactPlayer from 'react-player'
import firebase from '../firebase/clientApp'


export default function Home() {
  return (
    <div>
      <ReactPlayer url='https://www.youtube.com/watch?v=vwJbALuO-pM' />
    </div>
  )
}
