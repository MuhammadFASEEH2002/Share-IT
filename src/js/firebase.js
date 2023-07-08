// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZqtUppL3lhagw1YdQ3TdmMEz3vd7Vcj0",
  authDomain: "share-it-3a2eb.firebaseapp.com",
  projectId: "share-it-3a2eb",
  storageBucket: "share-it-3a2eb.appspot.com",
  messagingSenderId: "646080011659",
  appId: "1:646080011659:web:dda5b57bafb8c82457a38e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import {getDatabase,ref, set, child, update, remove} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";