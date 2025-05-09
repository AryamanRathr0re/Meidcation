import styled from "styled-components";

// Container Components
export const MedicationCardContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 340px;
  margin: 0 auto 1.5rem auto;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

// Information Components
export const MedicationInfo = styled.div`
  width: 100%;
`;

export const MedicationName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const MedicationDetails = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

// Action Components
export const ActionButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const ActionButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;

  &:hover {
    background: #e2e8f0;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ActionIcon = styled.span`
  font-size: 1rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Modal Components
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(44, 62, 80, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.18);
`;

export const ModalTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
`;

export const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: #3498db;
  color: white;

  &:hover {
    background: #2980b9;
  }

  &:active {
    transform: scale(0.98);
  }
`;
