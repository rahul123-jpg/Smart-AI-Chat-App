import React, { useContext, useEffect, useState } from 'react'
import "./ChatWindow.css"
import Chat from "./Chat.jsx";
import { MyContext } from './MyContext.jsx';
import axios from 'axios';
import {ScaleLoader} from "react-spinners"
const ChatWindow = () => {
 const{prompt,setPrompt,reply,setReply,currThreadId,prevChats,setPrevChats,setNewChat}= useContext(MyContext)
 const [loading,setLoading]=useState(false)
 const [isOpen,setIsOpen]=useState(false)

 const getReply = async () => {
  setLoading(true)
  setNewChat(false)
  console.log(prompt, currThreadId);

  try {
    const response = await axios.post(
      "http://localhost:8080/api/chat",
      {
        message: prompt,
        threadId: currThreadId  
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response.data);
    setReply(response.data.reply);
    setLoading(false)

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

   useEffect(() => {
  if (!prompt || !reply) return;

  setPrevChats(prevChats => ([
    ...prevChats,
    {
      role: "user",
      content: prompt
    },
    {
      role: "assistant",
      content: reply
    }
  ]));

  setPrompt("");
}, [reply]);

   const handleProfileClick=()=>{
    setIsOpen(!isOpen)
   }


  return (
    <div className='chatWindow'>
      <div className='navbar'>
       <span>  Smart AI Chat App &nbsp; <i class="fa-solid fa-arrow-down"></i></span>
       <div className='userIcondiv' onClick={handleProfileClick}>
       <span className='userIcon'>  <i class="fa-solid fa-user"></i> </span>
       </div>
      </div>

      {
        isOpen && 
        <div className='dropDown'>
           <div className='dropDownItem'><i class="fa-solid fa-gear"></i>Settings</div>
             <div className='dropDownItem'><i class="fa-solid fa-cloud-arrow-up"></i>Upgrade Plan</div>

          <div className='dropDownItem'><i class="fa-solid fa-arrow-right-from-bracket"></i>Log out</div>

        </div>
      }
      <Chat></Chat>
      <ScaleLoader color='#fff' loading={loading}></ScaleLoader>
      <div className='chatInput'>
        <div className="inputBox">
          <input placeholder='Ask anything'
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          onKeyDown={(e)=>e.key==="Enter"? getReply():""}
          >
          </input>
          <div id='submit' onClick={getReply}>  <i class="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className='info'>
         Smart AI Chat App can make mistakes . check important info. See Cookie Prefrences
        </p>
      </div>
          </div>
  )
}

export default ChatWindow
