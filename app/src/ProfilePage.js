import React, { useState, useEffect } from "react";
import OptionsBar from './Components/ProfilePage/Sidebar';
import ContactsBar from './Components/ProfilePage/ContactsBar';
import TextsPane from "./Components/textsPane/TextsPane";
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import "./ProfilePage.css";

export const SetCurrentConversations = React.createContext();

const ProfilePage = () => {

  const [conversations, setConversations] = useState([{name: "Loading..."}]);
  const [shownTextMessages, setShownTextMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const updateMessagePane = async (convo_id) => {
    console.log("covo_id: ", convo_id);
    await fetch("/conversations/texts", {body: JSON.stringify({"id": convo_id}), method: 'POST', headers: {'Content-Type': 'application/json'}}).then(res=>res.json()).then(data=>{
      if(data.pass !== undefined){
        if(data.pass == false){
          window.location.href = "http://localhost:3000/login";
        }
      }else{
        setShownTextMessages(data[0].messages);
      }
    })
  }  

  useEffect(async ()=>{
    await fetch("/conversations").then(res=>res.json()).then(data=>
      {
        if(data.pass != undefined){
          if(data.pass == false){
            window.location.href = "http://localhost:3000/login";
          }
        }else{
          console.log(data);
          setConversations([...data]);
        }
      });
    await fetch("/query-cookie").then(res=>res.json()).then(data=>
      {
        if(data.pass != undefined){
          if(data.pass == false){
            window.location.href = "http://localhost:3000/login";
          }
        }else{
          setCurrentUser(data.username);
        }
      });
  }, [])

  return(
    <SetCurrentConversations.Provider value={{updateMessagePane}}>
      <div className="row profile-container">
        <div className="col-sm-5 contactsBar">
          <ContactsBar contacts={conversations} />
        </div>
        <div className="col-lg-7 textsPane">
          <TextsPane texts={shownTextMessages} currentUser={currentUser} />
        </div>
      </div>
    </SetCurrentConversations.Provider>
  )
};

export default ProfilePage;
