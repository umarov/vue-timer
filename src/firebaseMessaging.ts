import { messaging } from "firebase";
import * as firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyBvvpU-ld3jS3Fq7JcleH_a77HlVtH9TOw",
  authDomain: "codeshoptimer.firebaseapp.com",
  databaseURL: "https://codeshoptimer.firebaseio.com",
  projectId: "codeshoptimer",
  storageBucket: "codeshoptimer.appspot.com",
  messagingSenderId: "222344146536",
  appId: "1:222344146536:web:a20829ebd638ed6d9ed5dd"
};

firebase.initializeApp(config);

export const firebaseMessaging = messaging();
