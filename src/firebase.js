// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMVRby6YuCPGvIVt6t6iHAW6veshhQoDI",
  authDomain: "chat-app-23499.firebaseapp.com",
  projectId: "chat-app-23499",
  storageBucket: "chat-app-23499.appspot.com",
  messagingSenderId: "565066908379",
  appId: "1:565066908379:web:8c191a69a0beba747cc2fe",
  measurementId: "G-9064KQR2RJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app);

export { db, auth }
