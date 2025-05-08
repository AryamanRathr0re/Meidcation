import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { auth, database } from "../firebase";
import { ref, onValue, update, remove } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import MedicationList from "./dashboard/MedicationList";
import AddMedicationModal from "./dashboard/AddMedicationModal";
import Footer from "./Footer";
import EditMedicationModal from "./dashboard/EditMedicationModal";
import DeleteMedicationModal from "./dashboard/DeleteMedicationModal";

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;
`;

const WelcomeText = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const DateText = styled.p`
  color: #7f8c8d;
  font-size: 1rem;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Widget = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const WidgetTitle = styled.h2`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MedicationCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
`;

const NotificationContainer = styled.div`
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
  animation: fadeIn 0.4s;
`;

const NotificationTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #3498db;
  font-size: 1.1rem;
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NotificationButton = styled.button`
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

const SnoozeButton = styled(NotificationButton)`
  background: #f1c40f;
  color: #2c3e50;
  &:hover {
    background: #f39c12;
  }
`;

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

const SnoozeOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const OptionButton = styled.button`
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

const CustomTimeInput = styled.input`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  width: 100%;
`;

const AddButton = styled.button`
  background: #3498db;
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
    background: #2980b9;
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

function Dashboard() {
  const [user, setUser] = useState(null);
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reminder, setReminder] = useState(null);
  const [showReminder, setShowReminder] = useState(false);
  const [showSnoozeModal, setShowSnoozeModal] = useState(false);
  const [snoozeMinutes, setSnoozeMinutes] = useState(10);
  const [customTime, setCustomTime] = useState("");
  const [snoozeType, setSnoozeType] = useState("preset");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    frequency: "Once daily",
    nextDose: "",
  });
  const [adding, setAdding] = useState(false);
  const [shownReminders, setShownReminders] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMed, setEditMed] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMed, setDeleteMed] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        const medicationsRef = ref(database, `users/${user.uid}/medications`);
        onValue(medicationsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const medicationsList = Object.entries(data).map(
              ([id, medication]) => ({
                id,
                ...medication,
              })
            );
            setMedications(medicationsList);
          } else {
            setMedications([]);
          }
          setLoading(false);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (medications.length > 0) {
      const now = new Date();
      const soon = new Date(now.getTime() + 5 * 60000);
      const nextMed = medications.find(
        (med) =>
          med.nextDose &&
          new Date(med.nextDose) > now &&
          new Date(med.nextDose) <= soon &&
          !shownReminders.includes(med.id)
      );
      if (nextMed) {
        setReminder(nextMed);
        setShowReminder(true);
        setShownReminders((prev) => [...prev, nextMed.id]);
      }
    }
  }, [medications, shownReminders]);

  const handleTakeReminder = async () => {
    if (!user || !reminder) return;
    const medicationRef = ref(
      database,
      `users/${user.uid}/medications/${reminder.id}`
    );
    const timestamp = new Date().toISOString();
    await update(medicationRef, { lastTaken: timestamp });
    setShowReminder(false);
    setReminder(null);
  };

  const handleMissedReminder = async () => {
    setShowReminder(false);
    setReminder(null);
  };

  const handleSnoozeReminder = () => {
    setShowSnoozeModal(true);
    setShowReminder(false);
  };

  const handleSnoozeConfirm = async () => {
    if (!user || !reminder) return;
    let newTime;
    if (snoozeType === "preset") {
      newTime = new Date(Date.now() + snoozeMinutes * 60000);
    } else if (snoozeType === "custom" && customTime) {
      newTime = new Date(customTime);
    }
    if (newTime) {
      const medicationRef = ref(
        database,
        `users/${user.uid}/medications/${reminder.id}`
      );
      await update(medicationRef, { nextDose: newTime.toISOString() });
    }
    setShowSnoozeModal(false);
    setReminder(null);
  };

  const handleSnoozeCancel = () => {
    setShowSnoozeModal(false);
    setReminder(null);
  };

  const handleTakeMedication = async (medicationId) => {
    if (!user) return;

    const medicationRef = ref(
      database,
      `users/${user.uid}/medications/${medicationId}`
    );
    const timestamp = new Date().toISOString();

    await update(medicationRef, {
      lastTaken: timestamp,
    });
  };

  const handleRenewPrescription = async (medicationId) => {
    if (!user) return;

    const medicationRef = ref(
      database,
      `users/${user.uid}/medications/${medicationId}`
    );
    const timestamp = new Date().toISOString();

    await update(medicationRef, {
      lastRenewed: timestamp,
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(medications);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMedications(items);
  };

  const handleAddMedication = async (e) => {
    e.preventDefault();
    if (!user) return;
    setAdding(true);
    const medId = uuidv4();
    const medicationRef = ref(
      database,
      `users/${user.uid}/medications/${medId}`
    );
    await update(medicationRef, {
      id: medId,
      ...newMed,
    });
    setShowAddModal(false);
    setNewMed({ name: "", dosage: "", frequency: "Once daily", nextDose: "" });
    setAdding(false);
  };

  const handleEditMedication = (med) => {
    setEditMed(med);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!user || !editMed) return;
    setUpdating(true);
    const medicationRef = ref(
      database,
      `users/${user.uid}/medications/${editMed.id}`
    );
    await update(medicationRef, editMed);
    setShowEditModal(false);
    setEditMed(null);
    setUpdating(false);
  };

  const handleDeleteMedication = (med) => {
    setDeleteMed(med);
    setShowDeleteModal(true);
  };

  const confirmDeleteMedication = async () => {
    if (!user || !deleteMed) return;
    setDeleting(true);
    const medicationRef = ref(
      database,
      `users/${user.uid}/medications/${deleteMed.id}`
    );
    await remove(medicationRef);
    setShowDeleteModal(false);
    setDeleteMed(null);
    setDeleting(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContainer>
      <AddButton onClick={() => setShowAddModal(true)}>
        + Add Medication
      </AddButton>

      {showAddModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Add Medication</ModalTitle>
            <form onSubmit={handleAddMedication}>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  value={newMed.name}
                  onChange={(e) =>
                    setNewMed({ ...newMed, name: e.target.value })
                  }
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Dosage</Label>
                <Input
                  type="text"
                  value={newMed.dosage}
                  onChange={(e) =>
                    setNewMed({ ...newMed, dosage: e.target.value })
                  }
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
                <CancelButton
                  type="button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </CancelButton>
                <ModalButton type="submit" disabled={adding}>
                  {adding ? "Adding..." : "Add"}
                </ModalButton>
              </ModalActions>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

      {showReminder && reminder && (
        <NotificationContainer>
          <NotificationTitle>Reminder: {reminder.name}</NotificationTitle>
          <div>
            It's time to take your dose: <b>{reminder.dosage}</b>
          </div>
          <NotificationActions>
            <NotificationButton onClick={handleTakeReminder}>
              Taken
            </NotificationButton>
            <NotificationButton onClick={handleMissedReminder}>
              Missed
            </NotificationButton>
            <SnoozeButton onClick={handleSnoozeReminder}>Snooze</SnoozeButton>
          </NotificationActions>
        </NotificationContainer>
      )}

      {showSnoozeModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Snooze or Reschedule Reminder</ModalTitle>
            <div>
              Choose a snooze duration or set a custom time for your next dose.
            </div>
            <SnoozeOptions>
              {[5, 10, 15, 30].map((min) => (
                <OptionButton
                  key={min}
                  className={
                    snoozeType === "preset" && snoozeMinutes === min
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setSnoozeType("preset");
                    setSnoozeMinutes(min);
                  }}
                >
                  {min} min
                </OptionButton>
              ))}
              <OptionButton
                className={snoozeType === "custom" ? "active" : ""}
                onClick={() => setSnoozeType("custom")}
              >
                Custom
              </OptionButton>
            </SnoozeOptions>
            {snoozeType === "custom" && (
              <CustomTimeInput
                type="datetime-local"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
            )}
            <ModalActions>
              <CancelButton onClick={handleSnoozeCancel}>Cancel</CancelButton>
              <ModalButton
                onClick={handleSnoozeConfirm}
                disabled={snoozeType === "custom" && !customTime}
              >
                Confirm
              </ModalButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}

      <EditMedicationModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        editMed={editMed}
        setEditMed={setEditMed}
        updating={updating}
      />
      <DeleteMedicationModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={confirmDeleteMedication}
        deleteMed={deleteMed}
        deleting={deleting}
      />

      <WelcomeSection>
        <WelcomeText>Welcome back, {user?.displayName || "User"}!</WelcomeText>
        <DateText>{new Date().toLocaleDateString()}</DateText>
      </WelcomeSection>

      <DashboardGrid>
        <Widget>
          <WidgetTitle>Upcoming Doses</WidgetTitle>
          <MedicationList
            medications={medications}
            onDragEnd={onDragEnd}
            onTakeMedication={handleTakeMedication}
            onRenewPrescription={handleRenewPrescription}
            onEditMedication={handleEditMedication}
            onDeleteMedication={handleDeleteMedication}
          />
        </Widget>

        <Widget>
          <WidgetTitle>Recent Actions</WidgetTitle>
          <MedicationList
            medications={medications}
            onRenewPrescription={handleRenewPrescription}
          />
        </Widget>
      </DashboardGrid>
    </DashboardContainer>
  );
}

export default Dashboard;
