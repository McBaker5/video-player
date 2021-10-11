import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import uploadFile from '../firebase/uploadFile'
import { useRef } from 'react'

export default function Upload() {
    const inputFile = useRef(null)
    const upload = () => {
        // get file
        var file = inputFile.current.files[0]
        uploadFile(file)
    }
    return (
        <div>
            <input type="file" onChange={upload} ref={inputFile} />
        </div>
    )
}
