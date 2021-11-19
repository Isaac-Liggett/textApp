import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/UserAccounts/Register/Register';
import Login from './Components/UserAccounts/Login/Login';
import NavigatonBar from './Components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes path="/">
        <Route path="" element={<HomePage />} />
        <Route path="register" element={
          <>
            <NavigatonBar/>
            <div className="align-middle">
              <Register/>
            </div>
          </>}/>
        <Route path="login" element={
          <>
            <NavigatonBar/>
            <div className="align-middle">
              <Login/>
            </div>
          </>}/>
        <Route path="profile" element={
          <ProfilePage />
        } />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
