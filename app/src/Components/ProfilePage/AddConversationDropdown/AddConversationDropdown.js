import React, { useState, useContext } from "react";
import "./AddConversationDropdown.css";
import Dropdown from "react-bootstrap/Dropdown";
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Column from "react-bootstrap/Col";
import { PlusCircle, X } from "react-bootstrap-icons";
import { SetCurrentConversations } from '../../../ProfilePage';

const NewUserDisplayBox = ({ user, userlist, setUserList }) => {
  if (user.exists === true) {
    return (
      <div className="newConvoUser green">
        <Row>
          <Column>
            <h4>{user.username}</h4>
          </Column>
          <Column>
            <h3 className="X" onClick={() => setUserList(userlist.filter(function(value){return value.username !== user.username}))}>
              <X />
            </h3>
          </Column>
        </Row>
      </div>
    );
  } else if (user.exists === false) {
    return (
      <div
        className="newConvoUser red"
        title="this user does not exist and therefore wont be added to the group"
      >
        <Row>
          <Column>
            <h4>{user.username}</h4>
          </Column>
          <Column>
            <h3
              className="X"
              onClick={() => setUserList(userlist.filter((value)=>{return value.username !== user.username}))}
            >
              <X />
            </h3>
          </Column>
        </Row>
      </div>
    );
  }
};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [newConversationName, setNewConversationName] = useState("");
    const [newConversationUsers, setNewConversationUsers] = useState([]);
    const [message, setMessage] = useState('');

    const { updateConvoPane, currentUser } = useContext(SetCurrentConversations);

    const AddUserToMock = async (userdata) => {
      var username = userdata.username;
      //check if user is already in list
      for (let i = 0; i < newConversationUsers.length; i++){
        if(username === newConversationUsers[i].username){
          return;
        }
      }

      //check if user exists
      await fetch("/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userdata.username }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log("error");
            //handle error
          } else {
            if (data.status === true) {
              setNewConversationUsers([
                ...newConversationUsers,
                { username: username, exists: true },
              ]);
            } else {
              setNewConversationUsers([
                ...newConversationUsers,
                { username: username, exists: false },
              ]);
            }
          }
        });
    };

    const handleCreateConvo = async (name, participants) => {
      var fixedParticipants = [currentUser];

      for(let i = 0; i < participants.length; i++){
        if(participants[i].exists === true){
          fixedParticipants.push(participants[i].username)
        }
      }
      if(newConversationName === ''){
        setMessage('please enter a name');
      }else if(fixedParticipants.length === 1){
        setMessage('invite some friends first');
      }else{
        await fetch('/conversations/create', {method: "POST",body: JSON.stringify({name: name, participants: fixedParticipants}), headers: {"Content-Type": "application/json"}}).then(res=>res.json()).then((data)=>{
          if(data.message){
            updateConvoPane();
          }else{
            console.log('error')
          }
        })
      }
    }

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <h6>Create Conversation</h6>
        <input
          type="text"
          placeholder="Conversation Name"
          value={newConversationName}
          onChange={(e) => {
            e.preventDefault();
            setNewConversationName(e.target.value);
          }}
        />
        <div className="addUser">
          <Row>
            <Column xs={9}>
              <input placeholder="add user" className="newUser" id="add_user" />
            </Column>
            <Column xs={1}>
              <h6 style={{ "padding-left": "4px" }}>
                <PlusCircle
                  onClick={() => {
                    if (document.getElementById("add_user").value !== "") {
                      AddUserToMock({
                        username: document.getElementById("add_user").value,
                      });
                      document.getElementById('add_user').value = "";
                    }
                  }}
                />
              </h6>
            </Column>
          </Row>
          <div className="new-participants-container">
            <div className="newConvoUser gray">
              <h3>{currentUser}</h3>
            </div>
            {newConversationUsers.map((user, index) => {
              return (
                <NewUserDisplayBox
                  user={user}
                  userlist={newConversationUsers}
                  setUserList={setNewConversationUsers}
                  key={index}
                />
              );
            })}
          </div>
          <div className="createConvo-but">
            <Button variant="warning" onClick={()=>handleCreateConvo(newConversationName, newConversationUsers)}>Create Conversation</Button>
          </div>
          <p className="message">{message}</p>
        </div>
      </div>
    );
  }
);

const AddConversationDropdown = () => {
  {  }

  return (
    <div className="dropdown-container">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <PlusCircle />
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}></Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default AddConversationDropdown;
