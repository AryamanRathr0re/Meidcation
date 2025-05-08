import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80");
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
  padding: 0 1rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  background-color: #3498db;
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

function Hero() {
  return (
    <HeroSection>
      <HeroContent>
        <Title>Your Personal Medication Management Solution</Title>
        <Subtitle>
          Never miss a dose again with Medisafe's smart medication reminders and
          comprehensive health tracking features.
        </Subtitle>
        <CTAButton to="/download">Download Now</CTAButton>
      </HeroContent>
    </HeroSection>
  );
}

export default Hero;
