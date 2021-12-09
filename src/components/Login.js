import React from "react";
import firebase from "firebase";
import { auth } from "../firebase";

const Login = () => {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <div className="grid place-content-center bg-gray-100 h-screen">
      <button
        className="px-8 py-3 rounded bg-yellow-400 font-semibold"
        onClick={signInWithGoogle}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
