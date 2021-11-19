import React from "react";

import './TextMessage.css';

const TextMessage = ({ colour, text, effect, sender }) => {
  return(
    <div className={`text ${colour} ${sender}`}>
      <h6>
        {text}
      </h6>
    </div>
  );
}

export default TextMessage;