import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Hospital theme colors
const hospitalBg = "#eaf6f8"; // soft blue-green
const hospitalCard = "#fafdff"; // gentle white
const hospitalAccent = "#4db6ac"; // teal accent
const hospitalText = "#23404a"; // deep blue-green
const hospitalSubtle = "#b2dfdb"; // subtle accent
const hospitalButton = "#4db6ac";
const hospitalButtonHover = "#00897b";

// Layout Components
export const DashboardBackground = styled.div`
  background: ${hospitalBg};
  min-height: 100vh;
`;

export const DashboardContainer = styled.div`
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionSpacer = styled.div`
  height: 2.5rem;
`;

export const WelcomeSection = styled.div`
  margin-bottom: 2rem;
`;

export const WelcomeText = styled.h1`
  font-size: 2rem;
  color: ${hospitalText};
  margin-bottom: 0.5rem;
`;

export const DateText = styled.p`
  color: ${hospitalAccent};
  font-size: 1rem;
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
`;

// Widget Components
export const Widget = styled.div`
  background: ${hospitalCard};
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  min-height: 340px;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 6px 24px rgba(44, 62, 80, 0.13);
    transform: translateY(-2px) scale(1.01);
  }
`;

export const AnalyticsCard = styled(Widget)`
  margin-bottom: 2.5rem;
  min-height: 320px;
`;

export const WidgetTitle = styled.h2`
  font-size: 1.25rem;
  color: ${hospitalAccent};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Form Components
export const AddButton = styled.button`
  background: ${hospitalButton};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background 0.2s;
  &:hover {
    background: ${hospitalButtonHover};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
`;

// Modal Components
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(44, 62, 80, 0.4);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.18);
  padding: 2rem 2.5rem;
  min-width: 340px;
  max-width: 90vw;
  animation: ${fadeInUp} 0.3s;
`;

export const ModalTitle = styled.h3`
  margin-top: 0;
  color: #3498db;
  font-size: 1.2rem;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
`;

export const ModalButton = styled.button`
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #2980b9;
  }
`;

export const CancelButton = styled(ModalButton)`
  background: #e2e8f0;
  color: #2c3e50;
  &:hover {
    background: #cbd5e0;
  }
`;

// Notification Components
export const NotificationContainer = styled.div`
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 2000;
  min-width: 320px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.15);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${fadeIn} 0.4s;
`;

export const NotificationTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #3498db;
  font-size: 1.1rem;
`;

export const NotificationActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const NotificationButton = styled.button`
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #2980b9;
  }
`;

export const SnoozeButton = styled(NotificationButton)`
  background: #f1c40f;
  color: #2c3e50;
  &:hover {
    background: #f39c12;
  }
`;

// Snooze Components
export const SnoozeOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

export const OptionButton = styled.button`
  background: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s, border 0.2s;
  &.active,
  &:hover {
    background: #3498db;
    color: #fff;
    border: 1px solid #3498db;
  }
`;

export const CustomTimeInput = styled.input`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  width: 100%;
`;
