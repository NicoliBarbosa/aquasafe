console.log("🔥 firebase.js carregado no deploy");
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBNEgUN1Xd15NhtUs4S8d6o_pGTdg_jZvA",
  authDomain: "aquasafe-d9068.firebaseapp.com",
  databaseURL: "https://aquasafe-d9068-default-rtdb.firebaseio.com/",
  projectId: "aquasafe-d9068",
  storageBucket: "aquasafe-d9068.appspot.com",
  messagingSenderId: "1070127772944",
  appId: "1:1070127772944:web:353c61c7760002e591a195",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
