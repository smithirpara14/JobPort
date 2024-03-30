import React, { useState, useRef } from 'react';
import { Nav } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import { isAuthenticated, isCandidate, isAdmin } from '../controllers/auth';
import "../style/profileMenu.css";

const ProfileMenu = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const onClick = () => setIsActive(!isActive);

  return (
    <div className="menu-container">
      <PersonFill onClick={onClick} color='white' size={32} className='mt-1 profile-icon' />
      <nav className={`menu ${isActive ? 'active' : ''}`} ref={dropdownRef}>
        <Nav.Link href="/profile" className="text-dark">
          Profile
        </Nav.Link>
        {isAuthenticated() && isAdmin() && (
            <Nav.Link href="/admin" className="text-dark">
              Admin
            </Nav.Link>
        )}
        {isAuthenticated() && isCandidate() && (
          <Nav.Link href="/myjobs" className="text-dark">
            My Jobs
          </Nav.Link>
        )}
        <Nav.Link href="/logout" className="text-dark">
          Logout
        </Nav.Link>
      </nav>
    </div>
  );
};

export default ProfileMenu;
