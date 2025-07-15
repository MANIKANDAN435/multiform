// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDRR5siNW7lE2r6aziwOyQY6gcaWSHpIdI",
  authDomain: "multiform-8496c.firebaseapp.com",
  databaseURL: "https://multiform-8496c-default-rtdb.firebaseio.com",
  projectId: "multiform-8496c",
  storageBucket: "multiform-8496c.firebasestorage.app",
  messagingSenderId: "852760942462",
  appId: "1:852760942462:web:be9dbeb0fc315ba958c52f",
  measurementId: "G-M32402SXCB"
};

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const auth = getAuth(app); 