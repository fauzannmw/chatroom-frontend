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
    const { uid, photoURL, displayName } = auth.currentUser;
    await db.collection("messages").add({
      text: msg,
      photoURL,
      uid,
      displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMsg("");
  }
  return (
    <div className="py-3 bg-gray-100 grid content-between">
      <div className="grid grid-cols-3 p-2 bg-gray-100 rounded items-center sticky top-0 ">
        <p className="col-span-2 text-xl text-indigo-600 font-semibold">
          Room : Tempat Gibah
        </p>
        <button
          className="p-2 w-full justify-self-end rounded bg-yellow-400 font-semibold"
          onClick={() => auth.signOut()}
        >
          Logout
        </button>
      </div>

      {messages.map(({ id, text, photoURL, uid, displayName }) => (
        <div>
          {uid === auth.currentUser.uid ? (
            <div
              key={id}
              className="grid grid-cols-5 p-2 gap-2 items-center text-black"
            >
              <div className="col-span-4">
                <p className="text-xl font-semibold">{displayName}</p>
                <p className="text-xl font-semibold">{text}</p>
              </div>
              <img
                className="col-span-1 rounded-full h-14"
                src={photoURL}
                alt=""
              />
            </div>
          ) : (
            <div
              key={id}
              className="grid grid-cols-5 p-2 gap-2 items-center text-gray-500"
            >
              <img
                className="col-span-1 rounded-full h-14"
                src={photoURL}
                alt=""
              />
              <div className="col-span-4">
                <p className="text-xl font-semibold">{displayName}</p>
                <p className="text-xl font-semibold">{text}</p>
              </div>
            </div>
          )}
        </div>
      ))}
      <form
        onSubmit={sendMessage}
        className="grid grid-cols-3 gap-3 px-2 py-4 bg-gray-100 rounded sticky bottom-0"
      >
        <input
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          type="text"
          name=""
          id=""
          className="col-span-2 p-2 border-2 border-yellow-500 rounded font-semibold"
          placeholder="Enter A Message"
        />
        <button type="submit" className="bg-yellow-400 rounded font-semibold">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
