// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOk3izBlwKfrLj5RL0NHiZUr2gslUj3RI",
  authDomain: "qpics-f0077.firebaseapp.com",
  projectId: "qpics-f0077",
  storageBucket: "qpics-f0077.appspot.com",
  messagingSenderId: "632319651371",
  appId: "1:632319651371:web:0cfb24d73380f0be4a446e",
  measurementId: "G-ETTVEHHGV8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
