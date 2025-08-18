import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIQhs9rOwGUGNKXZfCkU0tUmsH7nw3c5g",
  authDomain: "recetario-bamboo-mf.firebaseapp.com",
  projectId: "recetario-bamboo-mf",
  storageBucket: "recetario-bamboo-mf.appspot.com",
  messagingSenderId: "1002163997524",
  appId: "1:1002163997524:web:bae3be323df5f45eb356c1",
  measurementId: "G-X5NQSEVP2V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
