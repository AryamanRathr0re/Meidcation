import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterSection = styled.footer`
  background-color: #2c3e50;
  color: white;
  padding: 4rem 1rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const FooterColumn = styled.div``;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

const FooterLink = styled(Link)`
  color: #bdc3c7;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;

  &:hover {
    color: white;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: #bdc3c7;
  text-decoration: none;
  font-size: 1.5rem;

  &:hover {
    color: white;
  }
`;

const Copyright = styled.p`
  text-align: center;
  margin-top: 3rem;
  color: #bdc3c7;
  font-size: 0.9rem;
`;

function Footer() {
  return (
    <FooterSection>
      <Container>
        <FooterColumn>
          <FooterTitle>Company</FooterTitle>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
          <FooterLink to="/press">Press</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Solutions</FooterTitle>
          <FooterLink to="/solutions/digital-drug-companion">
            Digital Drug Companion
          </FooterLink>
          <FooterLink to="/solutions/pathways">PATHWAYS</FooterLink>
          <FooterLink to="/solutions/adherence">
            Adherence & Persistence
          </FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/case-studies">Case Studies</FooterLink>
          <FooterLink to="/webinars">Webinars</FooterLink>
          <FooterLink to="/documentation">Documentation</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Connect</FooterTitle>
          <SocialLinks>
            <SocialLink href="#" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </SocialLink>
            <SocialLink href="#" aria-label="LinkedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </SocialLink>
            <SocialLink href="#" aria-label="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </SocialLink>
          </SocialLinks>
        </FooterColumn>
      </Container>
      <Copyright>
        © {new Date().getFullYear()} Medisafe. All rights reserved.
      </Copyright>
    </FooterSection>
  );
}

export default Footer;
