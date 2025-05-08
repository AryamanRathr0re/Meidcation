import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Nav = styled.nav`
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;

  svg {
    color: #3498db;
  }

  span {
    color: #3498db;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #2c3e50;
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
  color: #2c3e50;
  font-weight: 500;
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#3498db" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "#3498db")};
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

function Navbar() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

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
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          Medi<span>safe</span>
        </Logo>
        <NavLinks>
          {user ? (
            <UserSection>
              <UserName>Hello, {user.displayName || "User"}</UserName>
              <NavLink to="/dashboard">Dashboard</NavLink>
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
