import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { db, auth, storage } from "../firebase";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState("");
  const types = ["image/png", "image/jpeg"];

  const scroll = useRef();

  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    console.log(messages);
  }, []);

  // useEffect(() => {
  //   if (image) {
  //     const storageRef = storage.ref(image.name);
  //     storageRef.put(image).on("state_changed", async () => {
  //       const url = await storageRef.getDownloadURL();
  //       setUrl(url);
  //     });
  //   }
  //   console.log(url);
  // }, [image]);

  useEffect(() => {
    (async function () {
      if (image) {
        const storageRef = storage.ref(image.name);
        const result = await storageRef.put(image);
        const url = await result.ref.getDownloadURL();
        setUrl(url);
        setMsg(image.name);
        // sendMessage();
        // setUrl(await result.ref.getDownloadURL());
        // sendMessage(e);
      }
    })();
  }, [image]);

  useEffect(() => {
    console.log(url);
  }, [url]);

  async function sendMessage(e) {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;
    await db.collection("messages").add({
      text: msg,
      photoURL,
      uid,
      displayName,
      url,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMsg("");
    setImage("");
    setUrl("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }

  function inputImage(e) {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setImage(selected);
    } else {
      setImage(null);
    }
  }

  return (
    <div className="py-3 bg-gray-100 grid content-between">
      <div className="grid grid-cols-3 p-2 bg-gray-100 rounded items-center sticky top-0 ">
        <p className="col-span-2 text-xl text-indigo-600 font-semibold">
          Room : Mahasiswa
        </p>
        <button
          className="p-2 w-full justify-self-end rounded bg-yellow-400 font-semibold"
          onClick={() => auth.signOut()}
        >
          Logout
        </button>
      </div>

      {messages.map(({ id, text, photoURL, uid, displayName, url }) => (
        <>
          {uid === auth.currentUser.uid ? (
            <div key={id} className="grid grid-cols-5 p-2 gap-2">
              <div className="col-span-4 grid text-right justify-items-end">
                <p className="text-xl text-blue-600 font-semibold">
                  {displayName}
                </p>
                <p className="text-xl font-semibold">{text}</p>
                <img className="max-h-56" src={url} alt="" />
              </div>
              <img
                className="col-span-1 rounded-full h-14 mt-2"
                src={photoURL}
                alt=""
              />
            </div>
          ) : (
            <div key={id} className="grid grid-cols-5 p-2 gap-2 items-center">
              <img
                className="col-span-1 rounded-full h-14"
                src={photoURL}
                alt=""
              />
              <div className="col-span-4">
                <p className="text-xl text-red-300 font-semibold">
                  {displayName}
                </p>
                <p className="text-xl font-semibold">{text}</p>
                <img className="max-h-48" src={url} alt="" />
              </div>
            </div>
          )}
        </>
      ))}
      <form
        onSubmit={sendMessage}
        className="grid grid-cols-5 gap-3 px-2 py-4 bg-gray-100 rounded sticky bottom-0"
      >
        <input
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          type="text"
          name=""
          id=""
          className="col-span-3 p-2 border-2 border-yellow-500 rounded font-semibold"
          placeholder="Enter A Message"
        />
        <label className="col-span-1 p-2 border-2 border-yellow-500 rounded text-gray-500 font-semibold">
          Image
          <input type="file" className="sr-only" onChange={inputImage} />
        </label>
        {/* <input
          type="file"
          className="col-span-1 p-2 border-2 border-yellow-500 rounded text-gray-500 font-semibold"
          onChange={inputImage}
        /> */}
        <button type="submit" className="bg-yellow-400 rounded font-semibold">
          Send
        </button>
      </form>
      <div ref={scroll}></div>
    </div>
  );
};

export default Chat;
