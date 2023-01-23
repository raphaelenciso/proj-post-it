import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyACv0i8Ls5GhAigMroOpdUO1caVyNZKXn4",
  authDomain: "post-it-2f5a8.firebaseapp.com",
  projectId: "post-it-2f5a8",
  storageBucket: "post-it-2f5a8.appspot.com",
  messagingSenderId: "34614100472",
  appId: "1:34614100472:web:bb402ae899d6dce726160d",
});

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
