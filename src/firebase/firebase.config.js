import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: "AIzaSyB0mIhIVrmObM9UyUty2kQibRsjxw4yAbA",
  // authDomain: "courtconnect-fe336.firebaseapp.com",
  // projectId: "courtconnect-fe336",
  // storageBucket: "courtconnect-fe336.firebasestorage.app",
  // messagingSenderId: "809706803679",
  // appId: "1:809706803679:web:691b728be08bac92eb746a"

 apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId:import.meta.env.VITE_projectId ,
  storageBucket:import.meta.env.VITE_storageBucket ,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
  
};

// Initialize Firebase
  export const app = initializeApp(firebaseConfig);