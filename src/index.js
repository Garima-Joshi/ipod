import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDW6GUrH61HDxRjNyU4oHKBUHwMV0aCqAk",
    authDomain: "apple-ipod-75b72.firebaseapp.com",
    projectId: "apple-ipod-75b72",
    storageBucket: "apple-ipod-75b72.appspot.com",
    messagingSenderId: "611549822444",
    appId: "1:611549822444:web:d4e58ab29fd425870354c9"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
