import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Button from "@restart/ui/esm/Button";
import { Redirect } from 'react-router-dom';

import './Login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({username: username, password: password})})
      .then(res=>res.json())
      .then(data=>{
        if(data.error){
          console.log(data.error)
          setMessage(data.error);
        }else{
          if(data.pass == true){
            //redirect
            window.location.href = "http://localhost:3000/profile";
          }else{
            setMessage('something went wrong');
          }
        }
      })
  }

  return(
    <div className="register-container mx-auto">
      <Card className="text-center">
        <Card.Body>
          <form className="mx-auto input" onSubmit={(e)=>handleSubmit(e)}>
            <div className="row">
            <h3>Sign Into Your Account</h3>
            </div>
            <div className="row field">
            <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="row field">
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="row field">
            <input type="submit" className="submit-btn btn btn-success" value="Login"></input>
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