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

function DeleteMedicationModal({
  open,
  onClose,
  onDelete,
  deleteMed,
  deleting,
}) {
  if (!open || !deleteMed) return null;
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Delete Medication</ModalTitle>
        <div>
          Are you sure you want to delete <b>{deleteMed.name}</b>?
        </div>
        <ModalActions>
          <CancelButton type="button" onClick={onClose}>
            Cancel
          </CancelButton>
          <ModalButton type="button" onClick={onDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </ModalButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
}

export default DeleteMedicationModal;
