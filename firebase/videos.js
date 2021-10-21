import firebase from '../firebase/clientApp'

const db = firebase.firestore()

export const updateMacroTag = async (macro, vidID) => { //// Add vidID as prop
    try {
      db.collection("videos").doc(vidID).update({ //// Use vidID in doc()
        macroTagIDs: firebase.firestore.FieldValue.arrayUnion(macro)
      })
      return {}
    } catch (error) {
      return {
        error: error.message
      }
    }
}

export const updateMicroTag = async (micro, vidID) => {
    try {
        db.collection("videos").doc(vidID).update({ //// Use vidID in doc()
            microTagIDs: firebase.firestore.FieldValue.arrayUnion(micro)
        })
      return {}
    } catch (error) {
      return {
        error: error.message
      }
    }
}

export const updateEvent = async (event, vidID) => {
    try {
        db.collection("videos").doc(vidID).update({
          microTagIDs: firebase.firestore.FieldValue.arrayUnion(event)

        })
        return {}
      } catch (error) {
        return {
          error: error.message
        }
      }
}

export const updateTitle = async (title, vidID) => {
    try {
        db.collection("videos").doc(vidID).update({
          title: title

        })
        return {}
      } catch (error) {
        return {
          error: error.message
        }
      }
}

export const updateDescription = async (desc, vidID) => {
    try {
        db.collection("videos").doc(vidID).update({
          description: desc

        })
        return {}
      } catch (error) {
        return {
          error: error.message
        }
      }
}