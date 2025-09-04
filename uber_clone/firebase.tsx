// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdLRBd9AmlBqW-Qw5QXoDExj9LNa-zaZg",
  authDomain: "uber-clone-feb1a.firebaseapp.com",
  projectId: "uber-clone-feb1a",
  storageBucket: "uber-clone-feb1a.appspot.com",
  messagingSenderId: "828847367478",
  appId: "1:828847367478:web:79f186555353d07b727f97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
const authentication = getAuth()

export {app,provider,authentication}