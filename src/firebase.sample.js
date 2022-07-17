// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "my-key",
  authDomain: "whatever.firebaseapp.com",
  projectId: "whatever",
  storageBucket: "whatever.appspot.com",
  messagingSenderId: "id",
  appId: "1:id:web:another_id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);