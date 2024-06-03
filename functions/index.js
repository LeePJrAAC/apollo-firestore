// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoqu-N8xvmT2T6Z8BzG_w4waRjlPITSFw",
  authDomain: "learning-58ecf.firebaseapp.com",
  projectId: "learning-58ecf",
  storageBucket: "learning-58ecf.appspot.com",
  messagingSenderId: "199547693643",
  appId: "1:199547693643:web:5e4581f9e07f3d47dabbce",
  measurementId: "G-647ES2PX9V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
