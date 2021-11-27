import React, { useState, useContext, useEffect } from "react";
import TextMessage from "../Text/TextMessage";
import SendMessageBox from "./SendMessageBox/SendMessageBox";
import "./TextsPane.css";

const TextsPane = ({
  texts,
  currentUser,
  currentConversationName,
  currentConversationID,
}) => {
  const [update, forceUpdate] = useState(0);

  useEffect(() => {
    if (texts == []) {
      return <div />;
    }else{
      document.getElementById('textsPaneScroll').scrollTo(0, document.getElementById('textsPaneScroll').scrollHeight);
    }
  });

  return (
    <>
      <div className="texts-container" id="textsPaneScroll">
      <h1 className="convoName sticky-top">{currentConversationName}</h1>
        <div className="texts-pane">
          {texts.map((text, index) => {
            if (text.from === currentUser) {
              return (
                <TextMessage
                  text={text.message}
                  colour="blue"
                  sender="right"
                  key={index}
                />
              );
            } else {
              return (
                <TextMessage
                  text={text.message}
                  from={text.from}
                  colour="green"
                  sender="left"
                  key={index}
                />
              );
            }
          })}
        </div>
        <div style={{"height": "5vh"}}/>
        <SendMessageBox
          conversationName={currentConversationName}
          conversationID={currentConversationID}
          rerender={() => forceUpdate(update + 1)}
        />
      </div>
    </>
  );
};

export default TextsPane;
