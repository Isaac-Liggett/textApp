import React, { useEffect, useState } from "react";
import "./ContactsBar.css";
import Card from "react-bootstrap/Card";

const ContactsBar = ({ contacts, setCurrentMessages }) => {

  useEffect(()=>{ 
    console.log(contacts);
  }, [])

  return (
    <div className="contacts-container">
      <h2>Contacts</h2>
      <div className="pane">
        {contacts.map((contact) => {
          return (
            <Card>
              <h3 className="contact">{contact.name}</h3>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ContactsBar;
