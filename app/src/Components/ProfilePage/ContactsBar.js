import React, { useContext } from "react";
import "./ContactsBar.css";
import Card from "react-bootstrap/Card";
import { SetCurrentConversations } from "../../ProfilePage";

const ContactsBar = ({ contacts }) => {
  const { updateMessagePane } = useContext(SetCurrentConversations);

  return (
    <div className="contacts-container">
      <div className="contacts-pane">
        <h2 style={{"padding-left": "0.5vw"}}>Contacts</h2>
        {contacts.map((contact, index)=>{
          //console.log(contact._id);
          return(
            <div onClick={()=>updateMessagePane(String(contact._id))} className="contact" key={index} >
              <h3 className="">{contact.name}</h3>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ContactsBar;
