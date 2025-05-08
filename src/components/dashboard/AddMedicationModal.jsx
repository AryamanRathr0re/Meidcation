import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
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
  animation: fadeIn 0.3s;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.18);
  padding: 2rem 2.5rem;
  min-width: 340px;
  max-width: 90vw;
  animation: fadeInUp 0.3s;
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  color: #3498db;
  font-size: 1.2rem;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
`;

const ModalButton = styled.button`
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

const CancelButton = styled(ModalButton)`
  background: #e2e8f0;
  color: #2c3e50;
  &:hover {
    background: #cbd5e0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
`;

function AddMedicationModal({
  open,
  onClose,
  onSubmit,
  newMed,
  setNewMed,
  adding,
}) {
  if (!open) return null;
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Add Medication</ModalTitle>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              value={newMed.name}
              onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Dosage</Label>
            <Input
              type="text"
              value={newMed.dosage}
              onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Frequency</Label>
            <Select
              value={newMed.frequency}
              onChange={(e) =>
                setNewMed({ ...newMed, frequency: e.target.value })
              }
            >
              <option>Once daily</option>
              <option>Twice daily</option>
              <option>Every 8 hours</option>
              <option>Every 12 hours</option>
              <option>Weekly</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Next Dose</Label>
            <Input
              type="datetime-local"
              value={newMed.nextDose}
              onChange={(e) =>
                setNewMed({ ...newMed, nextDose: e.target.value })
              }
              required
              min={new Date().toISOString().slice(0, 16)}
            />
          </FormGroup>
          <ModalActions>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <ModalButton type="submit" disabled={adding}>
              {adding ? "Adding..." : "Add"}
            </ModalButton>
          </ModalActions>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default AddMedicationModal;
