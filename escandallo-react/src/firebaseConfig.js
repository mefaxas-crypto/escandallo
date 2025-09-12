// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// This is taken directly from your original project file.
const firebaseConfig = {
    apiKey: "AIzaSyCIQhs9rOwGUGNKXZfCkU0tUmsH7nw3c5g",
    authDomain: "recetario-bamboo-mf.firebaseapp.com",
    projectId: "recetario-bamboo-mf",
    storageBucket: "recetario-bamboo-mf.appspot.com",
    messagingSenderId: "1002163997524",
    appId: "1:1002163997524:web:bae3be323df5f45eb356c1",
    measurementId: "G-X5NQSEVP2V"
}; //

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);