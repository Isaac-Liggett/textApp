import React from "react";

import './TextMessage.css';

const TextMessage = ({ colour, text, effect, sender, from }) => {
  return(
    <div>
      <div className={`text ${colour} ${sender}`}>
      <h14 className="from-text">{from ? from+":" : ""}</h14>
        <h6>
          {text}
        </h6>
      </div>
    </div>
  );
}

export default TextMessage;