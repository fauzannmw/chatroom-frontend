import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC5gnrM7VOANXiatXppLgGYJf5sbIpm52Y",
  authDomain: "chatroom-cd8ab.firebaseapp.com",
  projectId: "chatroom-cd8ab",
  storageBucket: "chatroom-cd8ab.appspot.com",
  messagingSenderId: "937528072393",
  appId: "1:937528072393:web:7b40fb44ac173c9dca1518",
  measurementId: "G-GG3CS2J0HL",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
