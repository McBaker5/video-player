import firebase from '../firebase/clientApp'

const uploadFile = async (file) => {
    var docRef = firebase.firestore().collection('videos').doc() // leave as .doc() for a random unique doc name to be assigned
    // create a storage ref to videos directory
    var storageRef = firebase.storage().ref('videos/' + docRef.id)
    // upload file
    await storageRef.put(file)
    // Add to firestore
    storageRef.getDownloadURL().then((url) => {
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

export default uploadFile