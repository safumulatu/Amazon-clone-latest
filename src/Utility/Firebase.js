import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMf0au_s6oDBwjsypN5Mzk-YeINvbJELg",
  authDomain: "clone-2024-687f0.firebaseapp.com",
  projectId: "clone-2024-687f0",
  storageBucket: "clone-2024-687f0.appspot.com",
  messagingSenderId: "163343003406",
  appId: "1:163343003406:web:4586b81801f3044229315f",
  measurementId: "G-YT9VN7NR13",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
