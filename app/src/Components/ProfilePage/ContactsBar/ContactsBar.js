import React, { useContext } from "react";
import "./ContactsBar.css";
import { SetCurrentConversations } from "../../../ProfilePage";
import AddConversationDropdown from "../AddConversationDropdown/AddConversationDropdown";

const ContactsBar = ({ contacts, currentUser }) => {
  const { updateMessagePane } = useContext(SetCurrentConversations);

  return (
    <div className="contacts-container">
      <div className="contacts-pane">
        <h2 style={{"padding-left": "0.5vw"}}>Contacts <AddConversationDropdown /></h2>
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
