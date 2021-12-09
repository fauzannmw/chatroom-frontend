import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { db, auth } from "../firebase";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    console.log(messages);
  }, []);

  async function sendMessage(e) {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await db.collection("messages").add({
      text: msg,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMsg("");
  }
  return (
    <div>
      <button onClick={() => auth.signOut()}>Logout</button>
      {messages.map(({ id, text, photoURL }) => (
        <div key={id}>
          <img src={photoURL} alt="" />
          <p>{text}</p>
        </div>
      ))}
      <form onSubmit={sendMessage} className="w">
        <input
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          type="text"
          name=""
          id=""
          placeholder="Enter A Message"
        />
        <button type="submit" className="px-4 py-1 bg-yellow-400 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
