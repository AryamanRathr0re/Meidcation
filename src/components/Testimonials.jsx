import React from "react";
import styled from "styled-components";

const TestimonialsSection = styled.section`
  padding: 5rem 1rem;
  background-color: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TestimonialContent = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.h4`
  color: #2c3e50;
  margin: 0;
`;

const AuthorTitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
`;

function Testimonials() {
  return (
    <TestimonialsSection>
      <Container>
        <Title>What Our Users Say</Title>
        <TestimonialsGrid>
          <TestimonialCard>
            <TestimonialContent>
              "Medisafe has completely transformed how I manage my medications.
              The reminders are timely and the interface is so easy to use."
            </TestimonialContent>
            <TestimonialAuthor>
              <AuthorImage
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                alt="Sarah Johnson"
              />
              <AuthorInfo>
                <AuthorName>Sarah Johnson</AuthorName>
                <AuthorTitle>Patient</AuthorTitle>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>

          <TestimonialCard>
            <TestimonialContent>
              "As a caregiver, I can easily monitor my mother's medication
              schedule and ensure she never misses a dose. It's been a
              lifesaver."
            </TestimonialContent>
            <TestimonialAuthor>
              <AuthorImage
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                alt="Michael Chen"
              />
              <AuthorInfo>
                <AuthorName>Michael Chen</AuthorName>
                <AuthorTitle>Caregiver</AuthorTitle>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>

          <TestimonialCard>
            <TestimonialContent>
              "The detailed reports and insights have helped me better
              understand my medication adherence patterns and improve my health
              outcomes."
            </TestimonialContent>
            <TestimonialAuthor>
              <AuthorImage
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                alt="Emily Rodriguez"
              />
              <AuthorInfo>
                <AuthorName>Emily Rodriguez</AuthorName>
                <AuthorTitle>Patient</AuthorTitle>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialsGrid>
      </Container>
    </TestimonialsSection>
  );
}

export default Testimonials;
