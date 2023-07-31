
import { initializeApp } from "firebase/app";
import {  getAuth, GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDTqm0wfay8H84kARU2bgnk49vRShdR7tE",
  authDomain: "henryepicgame-9bf7e.firebaseapp.com",
  projectId: "henryepicgame-9bf7e",
  storageBucket: "henryepicgame-9bf7e.appspot.com",
  messagingSenderId: "840178625028",
  appId: "1:840178625028:web:0c6d0d74d104ce148b2351",
  measurementId: "G-MC2KKB8EJ5"
};

const app = initializeApp(firebaseConfig);  
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth , provider}