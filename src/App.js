import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  const [chats, setChats] = useState([]);

  function create_chat() {

    axios.post('http://localhost:8000/create-chat/', {
      username: username,
      text: text
    })
    .then(() => {
      setText("");
    })
    .catch((err) => {
      console.log(err)
    })

  }

  useEffect(() => {
    axios.get('http://localhost:8000/get-chats/')
    .then((res) => {
      setChats(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  })

  return (
    <div className="p-5">
      <hr className="w-[100%] h-1 bg-gray-200 border-0 rounded dark:bg-gray-700" />
      <h1 className="pt-5 pb-5 text-3xl font-black">Open Chat</h1>
      <hr className="w-[100%] h-1 bg-gray-200 border-0 rounded dark:bg-gray-700" />
      
      <div className="mt-5 p-2 bg-slate-300 rounded-lg">
        <input className="pt-2 pb-2 pl-2 border-2 border-black rounded-lg" type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
        <input className="ml-2 pt-2 pb-2 pl-2 border-2 border-black rounded-lg" type="text" placeholder="Enter Text" onChange={(e) => setText(e.target.value)} />
        <input className="p-2 ml-2 border-2 border-black rounded-lg" type="submit" onClick={create_chat}  />
      </div>

      <div>

        {
          chats.map((data) => {
            return (
              <div key={data['id']} className="mt-5 p-4 w-24 min-w-fit bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg">
                <h1 className="text-3xl font-bold">{data['username']}</h1>
                <p>{data['text']}</p>
              </div>
            )
          })
        }

      </div>

    </div>
  );
}

export default App;
