import { useRef } from 'react'
import firebase from '../../firebase/clientApp'

const UploadFile = () => {
    const inputFile = useRef(null)

    const uploadFile = async () => {
        // get file
        var file = inputFile.current.files[0]
        // create a storage ref to videos directory
        var storageRef = firebase.storage().ref('videos/' + file.name)
        // upload file
        await storageRef.put(file)


        // Add to firestore
        storageRef.getDownloadURL().then((url) => {
            var docRef = firebase.firestore().collection('videos').doc() // leave as .doc() for a random unique doc name to be assigned
            docRef.set({
                description: 'testing firestore document creation when a video is uploaded',
                enabled: false,
                videoPath: url,
                ID: docRef.id,
                likeCount: 0,
                createdAt: firebase.firestore.Timestamp.now(),
                macroTagIDs: [],
                microTagIDs: [],
                title: 'Test'
            })
            .then(alert('Data was successfully sent to firestore'))
        })
    }

    return (
        <div>
            <input type="file" onChange={uploadFile} ref={inputFile} />
        </div>
    )
}

export default UploadFile