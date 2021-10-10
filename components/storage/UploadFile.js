import { useRef } from 'react'
import firebase from '../../firebase/clientApp'

const UploadFile = () => {
    const inputFile = useRef(null)

    function uploadFile() {
        // get file
        var file = inputFile.current.files[0]
        // create a storage ref to videos directory
        var storageRef = firebase.storage().ref('videos/' + file.name)
        // upload file
        storageRef.put(file)
    }

    return (
        <div>
            <input type="file" onChange={uploadFile} ref={inputFile} />
        </div>
    )
}

export default UploadFile