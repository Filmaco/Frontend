// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth';
import { sendEmailVerification } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX-lCLKQ3BSzZEhkDqZqpGzwg6nFbKU_0",
  authDomain: "filmaco-d72e5.firebaseapp.com",
  projectId: "filmaco-d72e5",
  storageBucket: "filmaco-d72e5.firebasestorage.app",
  messagingSenderId: "746499726763",
  appId: "1:746499726763:web:2c31ac2e14f087d92c46ee",
  measurementId: "G-XJT1BS00FK"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, sendPasswordResetEmail, confirmPasswordReset };
