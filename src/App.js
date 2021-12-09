import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Chat from "./components/Chat";
import Login from "./components/Login";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      {user ? <Chat /> : <Login />} 
    </div>
  );
}

export default App;
