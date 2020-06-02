import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyA6X-FVtt_KXMt1CkJEK57FaJSrJKKRkLw",
    authDomain: "construction-inspection-dapp.firebaseapp.com",
    databaseURL: "https://construction-inspection-dapp.firebaseio.com",
    projectId: "construction-inspection-dapp",
    storageBucket: "construction-inspection-dapp.appspot.com",
    messagingSenderId: "279252604754",
    appId: "1:279252604754:web:90f15466559ce2baa1cc8b",
    measurementId: "G-JYZSXQF7ST"
}

firebase.initializeApp(config)

export const firestore = firebase.firestore()

export default firebase