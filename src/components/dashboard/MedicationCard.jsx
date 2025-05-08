import React from "react";
import styled from "styled-components";

const MedicationCardContainer = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const MedicationInfo = styled.div`
  flex: 1;
`;

const MedicationName = styled.h3`
  font-size: 1rem;
  color: #2c3e50;
  margin-bottom: 0.25rem;
`;

const MedicationDetails = styled.p`
  font-size: 0.875rem;
  color: #7f8c8d;
`;

const ActionButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.2s;
  &:hover {
    background: #2980b9;
  }
`;

const ActionIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  color: #7f8c8d;
  font-size: 1.1rem;
  &:hover {
    color: #e74c3c;
  }
`;

function MedicationCard({ medication, onTake, onEdit, onDelete }) {
  return (
    <MedicationCardContainer>
      <MedicationInfo>
        <MedicationName>{medication.name}</MedicationName>
        <MedicationDetails>
          {medication.dosage} - {medication.frequency}
        </MedicationDetails>
        {medication.nextDose && (
          <MedicationDetails>
            <b>Next Dose:</b> {new Date(medication.nextDose).toLocaleString()}
          </MedicationDetails>
        )}
      </MedicationInfo>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ActionButton onClick={onTake}>Take</ActionButton>
        <ActionIcon title="Edit" onClick={onEdit}>
          ✏️
        </ActionIcon>
        <ActionIcon title="Delete" onClick={onDelete}>
          🗑️
        </ActionIcon>
      </div>
    </MedicationCardContainer>
  );
}

export default MedicationCard;
