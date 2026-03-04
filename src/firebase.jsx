// src/firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFtiXz5I4H0KZHoIFV8cFUytjgODZFj1Q",
  authDomain: "artisan-market-4e97e.firebaseapp.com",
  projectId: "artisan-market-4e97e",
  storageBucket: "artisan-market-4e97e.appspot.com",
  messagingSenderId: "9360040638",
  appId: "1:9360040638:web:2e7d96300cc20dd6af34ef",
  measurementId: "G-JWS22DWPLE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
export const storage = getStorage(app);

export { auth, db, googleProvider };
