// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBFsnrPC-6w_o3LjyXBN0UZAhm68SyfFr4",
  authDomain: "dev-portfolio-9cb38.firebaseapp.com",
  projectId: "dev-portfolio-9cb38",
  storageBucket: "dev-portfolio-9cb38.appspot.com",
  messagingSenderId: "693998080192",
  appId: "1:693998080192:web:da2f0fef2db56e968f1d25",
  measurementId: "G-HWN6KJF6LK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and export it
export const db = getFirestore(app);
