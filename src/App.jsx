import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Solutions from "./components/Solutions";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import UserProfile from "./components/UserProfile";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageContent = styled.div`
  flex: 1;
`;

function AppContent() {
  const location = useLocation();
  return (
    <MainContent>
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </PageContent>
      {location.pathname !== "/dashboard" &&
        location.pathname !== "/profile" && <Footer />}
    </MainContent>
  );
}

function App() {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <AppContent />
      </AppContainer>
    </Router>
  );
}

export default App;
