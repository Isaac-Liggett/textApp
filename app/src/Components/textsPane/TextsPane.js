import React, { useState, useContext, useEffect } from "react";
import TextMessage from '../Text/TextMessage';
import './TextsPane.css';

const TextsPane = ({ texts, currentUser, currentConversationName }) => {

  useEffect(()=>{
    if(texts==[]){
      return <div />
    }
  })

  return(
    <div className="texts-container">
      <h1 className="convoName">{currentConversationName}</h1>
      <div className="texts-pane">
        {texts.map((text, index)=>{
          if(text.from == currentUser){
            return <TextMessage text={text.message} colour="blue" sender="right" key={index} />;
          }else{
            return <TextMessage text={text.message} colour="green" sender="left" key={index} />;
          }
        })}
      </div>
    </div>
  );
}

export default TextsPane;