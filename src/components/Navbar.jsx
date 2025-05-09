import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Nav = styled.nav`
  background: #2c3e50;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ecf0f1;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  svg {
    color: #3498db;
    width: 28px;
    height: 28px;
  }

  span {
    color: #3498db;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-left: auto;
  padding-left: 200px; /* Add space for the logo */
`;

const NavLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #3498db;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  color: #ecf0f1;
  font-weight: 500;
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#3498db" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "#ecf0f1")};
  border: ${(props) => (props.primary ? "none" : "2px solid #3498db")};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.primary ? "#2980b9" : "#f8f9fa")};
  }
`;

const SearchBar = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  margin-right: 1rem;
  background: #ecf0f1;
`;

const NotificationIcon = styled.div`
  position: relative;
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
    color: #ecf0f1;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #2c3e50;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 0.5rem;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const DropdownItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  color: #ecf0f1;
  &:hover {
    background: #34495e;
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          Medi<span>Guard</span>
        </Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/features">Features</NavLink>
          <NavLink to="/solutions">Solutions</NavLink>
          <NavLink to="/testimonials">Testimonials</NavLink>
          <SearchBar placeholder="Search..." />
          <NotificationIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </NotificationIcon>
          {user ? (
            <UserSection>
              <UserName>Hello, {user.displayName || "User"}</UserName>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <Button onClick={handleLogout}>Logout</Button>
            </UserSection>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <Button primary as={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

export default Navbar;
