import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiVUA51oJ-ETej-QUqWYj6RdofmSQK4rQ",
  authDomain: "my-first-project-as-a0034.firebaseapp.com",
  projectId: "my-first-project-as-a0034",
  storageBucket: "my-first-project-as-a0034.firebasestorage.app",
  messagingSenderId: "146743059039",
  appId: "1:146743059039:web:f3b162c1d1adce26c8b1ea",
  measurementId: "G-LQMKVM0C9V"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);