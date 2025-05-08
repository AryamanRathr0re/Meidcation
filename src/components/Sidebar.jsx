import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const SidebarWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
`;

const SidebarContainer = styled.div`
  width: ${(props) => (props.isOpen ? "250px" : "0px")};
  height: 100vh;
  background: white;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s ease;
`;

const ToggleButton = styled.button`
  position: fixed;
  left: 0;
  top: 20px;
  width: 32px;
  height: 32px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1100;

  &:hover {
    background: #f8f9fa;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #2c3e50;
    transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
    transition: transform 0.3s ease;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
  overflow: hidden;

  svg {
    color: #3498db;
    min-width: 32px;
  }

  span {
    color: #3498db;
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    transition: opacity 0.3s ease;
  }
`;

const NavSection = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${(props) => (props.active ? "#3498db" : "#2c3e50")};
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem;
  border-radius: 6px;
  transition: all 0.2s;
  background: ${(props) => (props.active ? "#ebf8ff" : "transparent")};
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background: #f8f9fa;
    color: #3498db;
  }

  svg {
    width: 20px;
    height: 20px;
    min-width: 20px;
  }

  span {
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    transition: opacity 0.3s ease;
  }
`;

const UserSection = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
  white-space: nowrap;
  overflow: hidden;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  min-width: 40px;
`;

const UserName = styled.div`
  flex: 1;
  color: #2c3e50;
  font-weight: 500;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transition: opacity 0.3s ease;
`;

const Button = styled.button`
  width: 100%;
  background: ${(props) => (props.primary ? "#3498db" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "#3498db")};
  border: ${(props) => (props.primary ? "none" : "2px solid #3498db")};
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background: ${(props) => (props.primary ? "#2980b9" : "#f8f9fa")};
  }

  svg {
    width: 20px;
    height: 20px;
    min-width: 20px;
  }

  span {
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    transition: opacity 0.3s ease;
  }
`;

function Sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, loading] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <SidebarWrapper>
      <ToggleButton isOpen={isOpen} onClick={onToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </ToggleButton>
      <SidebarContainer isOpen={isOpen}>
        {isOpen && (
          <>
            <Logo to="/" isOpen={isOpen}>
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
              <span>
                Medi<span>safe</span>
              </span>
            </Logo>

            <NavSection>
              <NavLink
                to="/"
                active={location.pathname === "/"}
                isOpen={isOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/solutions"
                active={location.pathname === "/solutions"}
                isOpen={isOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span>Solutions</span>
              </NavLink>
              <NavLink
                to="/technology"
                active={location.pathname === "/technology"}
                isOpen={isOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span>Technology</span>
              </NavLink>
              <NavLink
                to="/insights"
                active={location.pathname === "/insights"}
                isOpen={isOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>Insights</span>
              </NavLink>
              {user && (
                <NavLink
                  to="/dashboard"
                  active={location.pathname === "/dashboard"}
                  isOpen={isOpen}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                  <span>Dashboard</span>
                </NavLink>
              )}
            </NavSection>

            <UserSection>
              {user ? (
                <>
                  <UserInfo>
                    <UserAvatar>{getUserInitials(user.displayName)}</UserAvatar>
                    <UserName isOpen={isOpen}>
                      {user.displayName || "User"}
                    </UserName>
                  </UserInfo>
                  <Button onClick={handleLogout} isOpen={isOpen}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button as={Link} to="/login" isOpen={isOpen}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    <span>Login</span>
                  </Button>
                  <Button
                    primary
                    as={Link}
                    to="/signup"
                    style={{ marginTop: "0.5rem" }}
                    isOpen={isOpen}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" y1="8" x2="19" y2="14" />
                      <line x1="22" y1="11" x2="16" y2="11" />
                    </svg>
                    <span>Sign Up</span>
                  </Button>
                </>
              )}
            </UserSection>
          </>
        )}
      </SidebarContainer>
    </SidebarWrapper>
  );
}

export default Sidebar;
