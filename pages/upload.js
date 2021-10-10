import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import UploadFile from '../components/storage/UploadFile'

export default function Upload() {
    return (
        <div>
            <UploadFile />
        </div>
    );
}
