import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Solutions from "./components/Solutions";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: ${(props) => (props.sidebarOpen ? "250px" : "0px")};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
`;

const PageContent = styled.div`
  flex: 1;
`;

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function AppContent({ sidebarOpen }) {
  const location = useLocation();
  return (
    <MainContent sidebarOpen={sidebarOpen}>
      <PageContent>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
                <Solutions />
                <Testimonials />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </PageContent>
      {location.pathname !== "/dashboard" && <Footer />}
    </MainContent>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <AppContainer>
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <AppContent sidebarOpen={sidebarOpen} />
      </AppContainer>
    </Router>
  );
}

export default App;
