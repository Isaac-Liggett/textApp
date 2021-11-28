import React, { useState, useContext } from "react";
import './SendMessageBox.css';
import { SetCurrentConversations } from '../../../ProfilePage.js';

const SendMessageBox = ({ conversationID, conversationName, rerender }) => {
  const [message, setMessage] = useState('');

  const { updateMessagePane } =  useContext(SetCurrentConversations);

  const sendMessage = async (e, message) => {
    e.preventDefault();
    await fetch('/conversations/texts/send', {method: "POST", body: JSON.stringify({_id: conversationID, message: message}), headers: {'Content-Type': 'application/json'}}).then(()=>updateMessagePane(conversationID))
  }

  if(conversationName === undefined || conversationName == ""){
    return <div />
  }

  return(
    <div className="textbox-container">
      <div className="textbox">
        <form onSubmit={(e)=>sendMessage(e, message)}>
          <input type="text" className="messagebox" value={message} placeholder={`Send a message to ${conversationName}`} onChange={(e)=>setMessage(e.target.value)} />
          <button type="submit" class="send btn btn-success" onClick={(e)=>{sendMessage(e, message)}}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default SendMessageBox;