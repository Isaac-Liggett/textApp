import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Gear } from 'react-bootstrap-icons';

import './Sidebar.css';

const Sidebar = ({ contacts }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <div>
      <div className="settings sticky-top">
        <Button variant="primary" onClick={handleShow}><Gear /></Button>
      </div>
      
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title> <h2>More Options</h2> </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h3>Settings</h3>
          <h3>Log Out</h3>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
};

export default Sidebar;
