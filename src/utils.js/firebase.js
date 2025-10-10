import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflixgpt-97722.firebaseapp.com",
  projectId: "netflixgpt-97722",
  storageBucket: "netflixgpt-97722.appspot.com",
  messagingSenderId: "103960571967",
  appId: "1:103960571967:web:5b38d7e7cd59021164488a",
  measurementId: "G-HNWFPFP8NG"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);