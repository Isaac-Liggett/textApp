import React, { useContext } from "react";
import "./ContactsBar.css";
import Card from "react-bootstrap/Card";
import { SetCurrentConversations } from "../../ProfilePage";

const ContactsBar = ({ contacts }) => {
  const { updateMessagePane } = useContext(SetCurrentConversations);

  return (
    <div className="contacts-container">
      <h2>Contacts</h2>
      <div className="pane">
        {contacts.map((contact, index)=>{
          //console.log(contact._id);
          return(
            <Card onClick={()=>updateMessagePane(String(contact._id))} key={index} >
              <h3 className="contact">{contact.name}</h3>
            </Card>
          )
        })}
      </div>
    </div>
  );
};

export default ContactsBar;
