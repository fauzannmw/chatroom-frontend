import React from "react";
import firebase from "firebase";
import { auth } from "../firebase";

const Login = () => {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <div>
      <button onClick={signInWithGoogle}>Login</button>
    </div>
  );
};

export default Login;
