import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 0.5rem;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  color: #3498db;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  span {
    color: #3498db;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #3498db;
  }
`;

const Button = styled(Link)`
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    background-color: #2980b9;
  }
`;

const LoginButton = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 2px solid #3498db;
  border-radius: 4px;
  margin-left: 1rem;

  &:hover {
    background-color: #3498db;
    color: white;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <LogoContainer to="/">
          <LogoIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </LogoIcon>
          <LogoText>
            Medi<span>safe</span>
          </LogoText>
        </LogoContainer>
        <MenuButton onClick={() => setIsOpen(!isOpen)}>☰</MenuButton>
        <NavLinks isOpen={isOpen}>
          <NavLink to="/solutions">Solutions</NavLink>
          <NavLink to="/technology">Technology</NavLink>
          <NavLink to="/insights">Insights</NavLink>
          <Button to="/download">Download App</Button>
          <LoginButton to="/login">Login</LoginButton>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

export default Navbar;
