// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// importation de la base de donnee
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDtWTu6g5b_IfHNgAGZCdpqQG1BfxiZvZU",
    authDomain: "mobile-app-32c47.firebaseapp.com",
    projectId: "mobile-app-32c47",
    storageBucket: "mobile-app-32c47.firebasestorage.app",
    messagingSenderId: "132208213669",
    appId: "1:132208213669:web:b39b40e04a7f16acd6974c",
    measurementId: "G-26CWR966S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Auth = getAuth(app);
// initialisation de la base de donnee
const db = getDatabase(app);
export { app, analytics, Auth, db };