import React, { useState, useEffect } from "react";
import OptionsBar from './Components/ProfilePage/Sidebar';
import ContactsBar from './Components/ProfilePage/ContactsBar';

const HomePage = () => {

  const [conversations, setConversations] = useState([{name: "Loading..."}]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(async ()=>{
    await fetch("/conversations").then(res=>res.json()).then(data=>setConversations([...data]));
    await fetch("/query-cookie").then(res=>res.json()).then(data=>setCurrentUser(data.username));
  }, [])

  return(
    <div>
      <OptionsBar />
      <ContactsBar contacts={conversations} />
      {/*
      
        todo: make conversations appear
      
      */}
    </div>
  )
};

export default HomePage;
