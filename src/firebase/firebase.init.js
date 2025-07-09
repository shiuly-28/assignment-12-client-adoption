// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGXr7Pd47MhXmQI2pZXQIYLHexxYwFzVU",
    authDomain: "assignment-12-client-79f74.firebaseapp.com",
    projectId: "assignment-12-client-79f74",
    storageBucket: "assignment-12-client-79f74.firebasestorage.app",
    messagingSenderId: "506782047123",
    appId: "1:506782047123:web:7fa751804840c3d2ede666"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);