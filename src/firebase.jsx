import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


// directly copied from the app in firebase
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "nutritionapp-12570.firebaseapp.com",
  projectId: "nutritionapp-12570",
  storageBucket: "nutritionapp-12570.appspot.com",
  messagingSenderId: "410771378143",
  appId: "1:410771378143:web:4b0948993c0bb47cb2be6a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();