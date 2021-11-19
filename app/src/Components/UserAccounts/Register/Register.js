import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Button from "@restart/ui/esm/Button";

import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/register', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({username: username, email: email, password: password})})
      .then(res=>res.json())
      .then(data=>{
        if(data.error){
          console.log(data.error)
          setMessage(data.error);
        }
        if(data.message){
          setMessage(data.message);
        }
      })
  }

  return(
    <div className="register-container mx-auto">
      <Card className="text-center">
        <Card.Body>
          <form className="mx-auto input" onSubmit={(e)=>handleSubmit(e)}>
            <div className="row">
            <h3>Make An Account</h3>
            </div>
            <div className="row field">
            <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="row field">
            <input type="email" value={email} placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="row field">
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="row field">
            <input type="submit" className="submit-btn btn btn-success" value="Register"></input>
            </div>
            <div className="text-center message">
              {message}
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;