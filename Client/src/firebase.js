import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQEmxXHrbWesz_keRwV5Eua9Zm1LmRbT4",
  authDomain: "chat-4f8e1.firebaseapp.com",
  projectId: "chat-4f8e1",
  storageBucket: "chat-4f8e1.appspot.com",
  messagingSenderId: "446760250823",
  appId: "1:446760250823:web:31d41bd1ce595d3ce3bde2",
  measurementId: "G-C1VHGLGK7K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
