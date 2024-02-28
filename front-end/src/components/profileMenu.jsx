import React, { useState, useRef } from 'react';
import { Nav } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";
import "../style/profileMenu.css"

const ProfileMenu = () => {
    //const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const onClick = () => setIsActive(!isActive);

  return (
      <div className="menu-container">
        <PersonFill onClick={onClick} color='white' size={32} className='mt-1'/>      
            <nav className={`menu ${isActive ? 'active' : ''}`} ref={dropdownRef}>
                <Nav.Link href="/profile" className="text-dark">
                    Profile
                </Nav.Link>
                <Nav.Link href="/logout" className="text-dark">
                    Logout
                </Nav.Link>
        </nav>
    </div>
  );
};

export default ProfileMenu;
