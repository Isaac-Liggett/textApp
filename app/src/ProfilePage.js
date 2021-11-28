import React, { useState, useEffect } from "react";
import ContactsBar from "./Components/ProfilePage/ContactsBar/ContactsBar";
import TextsPane from "./Components/textsPane/TextsPane";
import "./ProfilePage.css";

export const SetCurrentConversations = React.createContext();

const ProfilePage = () => {
  const [conversations, setConversations] = useState([{ name: "Loading..." }]);
  const [currentConversation, setCurrentConversation] = useState({
    _id: "",
    name: "",
    messages: [],
  });
  const [currentUser, setCurrentUser] = useState();

  const updateMessagePane = async (convo_id) => {
    console.log("covo_id: ", convo_id);
    await fetch("/conversations/texts", {
      body: JSON.stringify({ id: convo_id }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.pass !== undefined) {
          if (data.pass == false) {
            window.location.href = "http://localhost:3000/login";
          }
        } else {
          setCurrentConversation(data[0]);
        }
      });
  };

  const updateConvoPane = async () => {
    await fetch("/conversations")
      .then((res) => res.json())
      .then((data) => {
        if (data.pass != undefined) {
          if (data.pass == false) {
            window.location.href = "http://localhost:3000/login";
          }
        } else {
          console.log(data);
          setConversations([...data]);
        }
      });
    await fetch("/query-cookie")
      .then((res) => res.json())
      .then((data) => {
        if (data.pass !== undefined) {
          if (data.pass === false) {
            window.location.href = "http://localhost:3000/login";
          }
        } else {
          setCurrentUser(data.username);
        }
      });
  }

  useEffect(() => {
    let interval = setInterval(()=>{
      if(currentConversation._id !== ""){
        updateMessagePane(currentConversation._id);
        updateConvoPane();
      }else{
        updateConvoPane();
      }
    }, 1000)
    return ()=>clearInterval(interval);
  });

  return (
    <SetCurrentConversations.Provider value={{ updateMessagePane, updateConvoPane, currentUser }}>
      <div className="row">
        <div className="col-sm-5 contactsBar">
          <ContactsBar contacts={conversations} />
        </div>
        <div className="col-lg-7 textsPane">
          <TextsPane
            texts={currentConversation.messages}
            currentUser={currentUser}
            currentConversationName={currentConversation.name}
            currentConversationID={currentConversation._id}
          />
        </div>
      </div>
    </SetCurrentConversations.Provider>
  );
};

export default ProfilePage;
