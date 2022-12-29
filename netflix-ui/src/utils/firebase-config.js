
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDDDPF7Y5B9V2Svl575hiXIq704N-3p0O0",
  authDomain: "react-netflix-clone-f74d3.firebaseapp.com",
  projectId: "react-netflix-clone-f74d3",
  storageBucket: "react-netflix-clone-f74d3.appspot.com",
  messagingSenderId: "521648277986",
  appId: "1:521648277986:web:bcf8e68cb522a92ca1d1bb",
  measurementId: "G-8YG2D4RXEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initializes app with config object  contains api key auth domain,project id

export const firebaseAuth = getAuth(app); //gts all autheticattion services for app 

