import React, { useState, useContext, useEffect } from "react";
import TextMessage from '../Text/TextMessage';

const TextsPane = ({ texts, currentUser }) => {

  useEffect(()=>{
    if(texts==[]){
      return <div />
    }
  })

  return(
    <div>
      {texts.map((text, index)=>{
        if(text.from == currentUser){
          return <TextMessage text={text.message} colour="blue" sender="right" key={index} />;
        }else{
          return <TextMessage text={text.message} colour="green" sender="left" key={index} />;
        }
      })}
    </div>
  );
}

export default TextsPane;