// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 Firestore import

const firebaseConfig = {
  apiKey: "AIzaSyDAGt6yiJuuqTNGeMNYXaFscKW90wiQrnU",
  authDomain: "viserra-auth.firebaseapp.com",
  projectId: "viserra-auth",
  storageBucket: "viserra-auth.firebasestorage.app",
  messagingSenderId: "344987597703",
  appId: "1:344987597703:web:c38569e9e99579cf0af122",
  measurementId: "G-GG00K1CEY4"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); // 👈 Firestore instance

export { auth, db };
