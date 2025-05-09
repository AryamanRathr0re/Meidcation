import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FaClock, FaCalendarAlt, FaPills, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import MedicationSchedule from "./MedicationSchedule";
import {
  MedicationCardContainer,
  MedicationInfo,
  MedicationName,
  MedicationDetails,
  ActionButton,
  ActionIcon,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalActions,
  ModalButton,
} from "./MedicationCard.styles";

function MedicationCard({
  medication,
  onTake,
  onRenew,
  onEdit,
  onDelete,
  onScheduleChange,
  badgeType,
}) {
  const navigate = useNavigate();
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  // const [showScheduleModal, setShowScheduleModal] = useState(false);

  const handleTake = () => {
    onTake(medication);
  };

  const handleRenew = () => {
    onRenew(medication.id);
    setShowRenewalModal(false);
  };

  // const handleScheduleSave = (newSchedule) => {
  //   onScheduleChange(medication.id, newSchedule);
  //   setShowScheduleModal(false);
  // };

  const getBadge = () => {
    if (typeof badgeType === "function") {
      return badgeType(medication);
    }
    return badgeType;
  };

  return (
    <MedicationCardContainer>
      <MedicationInfo>
        <MedicationName>{medication.name}</MedicationName>
        <MedicationDetails>
          <div>
            <FaPills /> {medication.dosage} {medication.unit}
          </div>
          <div>
            <FaClock /> {medication.frequency}
          </div>
          <div>
            <FaCalendarAlt /> {medication.nextDose}
          </div>
        </MedicationDetails>
      </MedicationInfo>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <ActionButton onClick={handleTake}>
          <ActionIcon>✓</ActionIcon>
        </ActionButton>
        {/* <ActionButton onClick={() => setShowScheduleModal(true)}>
          <ActionIcon>
            <FaClock />
        </ActionIcon>
        </ActionButton> */}
        <ActionButton onClick={() => setShowRenewalModal(true)}>
          <ActionIcon>↻</ActionIcon>
        </ActionButton>
        <ActionButton onClick={() => onEdit(medication)}>
          <ActionIcon>✎</ActionIcon>
        </ActionButton>
        <ActionButton onClick={() => onDelete(medication.id)}>
          <ActionIcon>×</ActionIcon>
        </ActionButton>
      </div>

      {showRenewalModal &&
        ReactDOM.createPortal(
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>Request Prescription Renewal</ModalTitle>
              <p>Would you like to request a renewal for {medication.name}?</p>
              <ModalActions>
                <ModalButton onClick={() => setShowRenewalModal(false)}>
                  Cancel
                </ModalButton>
                <ModalButton onClick={handleRenew}>Request Renewal</ModalButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>,
          document.body
        )}
    </MedicationCardContainer>
  );
}

export default MedicationCard;
