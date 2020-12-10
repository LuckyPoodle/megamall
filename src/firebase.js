import firebase from "firebase/app";
import 'firebase/auth';
//import * as firebase from "firebase";


  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB6AZbfQavZ5MK9rLz1nV1oUx00I77BugQ",
    authDomain: "megamall-react.firebaseapp.com",
    databaseURL: "https://megamall-react.firebaseio.com",
    projectId: "megamall-react",
    storageBucket: "megamall-react.appspot.com",
    messagingSenderId: "479510933206",
    appId: "1:479510933206:web:b306fa9c72d330c939e377",
    measurementId: "G-XG48T2RLBL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  //export
  export const auth=firebase.auth()
  export const googleAuthProvider= new firebase.auth.GoogleAuthProvider();
