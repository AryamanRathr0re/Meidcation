import React from "react";
import styled from "styled-components";

const SolutionsSection = styled.section`
  padding: 5rem 1rem;
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

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const SolutionCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SolutionImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
`;

const SolutionContent = styled.div`
  padding: 2rem;
`;

const SolutionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const SolutionDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const LearnMoreButton = styled.a`
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;

function Solutions() {
  return (
    <SolutionsSection>
      <Container>
        <Title>Our Solutions</Title>
        <SolutionsGrid>
          <SolutionCard>
            <SolutionImage
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")',
              }}
            />
            <SolutionContent>
              <SolutionTitle>Digital Drug Companion</SolutionTitle>
              <SolutionDescription>
                A comprehensive solution that helps patients manage their
                medications effectively with smart reminders and tracking.
              </SolutionDescription>
              <LearnMoreButton href="#">Learn More →</LearnMoreButton>
            </SolutionContent>
          </SolutionCard>

          <SolutionCard>
            <SolutionImage
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")',
              }}
            />
            <SolutionContent>
              <SolutionTitle>PATHWAYS</SolutionTitle>
              <SolutionDescription>
                Personalized treatment pathways that guide patients through
                their healthcare journey with clear instructions and support.
              </SolutionDescription>
              <LearnMoreButton href="#">Learn More →</LearnMoreButton>
            </SolutionContent>
          </SolutionCard>

          <SolutionCard>
            <SolutionImage
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")',
              }}
            />
            <SolutionContent>
              <SolutionTitle>Adherence & Persistence</SolutionTitle>
              <SolutionDescription>
                Advanced analytics and engagement tools to improve medication
                adherence and treatment persistence.
              </SolutionDescription>
              <LearnMoreButton href="#">Learn More →</LearnMoreButton>
            </SolutionContent>
          </SolutionCard>
        </SolutionsGrid>
      </Container>
    </SolutionsSection>
  );
}

export default Solutions;
