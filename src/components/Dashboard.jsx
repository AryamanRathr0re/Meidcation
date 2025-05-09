import React, { useState, useEffect } from "react";
import { auth, database } from "../firebase";
import { ref, onValue, update, remove } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import MedicationList from "./dashboard/MedicationList";
import AddMedicationModal from "./dashboard/AddMedicationModal";
import Footer from "./Footer";
import EditMedicationModal from "./dashboard/EditMedicationModal";
import DeleteMedicationModal from "./dashboard/DeleteMedicationModal";
import MedicationHistory from "./dashboard/MedicationHistory";
import { toast } from "react-hot-toast";
import { doc, updateDoc } from "firebase/firestore";
import ProtectedRoute from "./ProtectedRoute";
import {
  DashboardBackground,
  DashboardContainer,
  WelcomeSection,
  WelcomeText,
  DateText,
  DashboardGrid,
  Widget,
  WidgetTitle,
  AddButton,
  FormGroup,
  Label,
  Input,
  Select,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalActions,
  ModalButton,
  CancelButton,
  NotificationContainer,
  NotificationTitle,
  NotificationActions,
  NotificationButton,
  SnoozeButton,
  SnoozeOptions,
  OptionButton,
  CustomTimeInput,
  AnalyticsCard,
  SectionSpacer,
} from "./dashboard/Dashboard.styles";
import AdherenceAnalytics from "./dashboard/AdherenceAnalytics";
import {
  FaChartBar,
  FaClock,
  FaHistory,
  FaList,
  FaPills,
} from "react-icons/fa";
import HelpWidget from "./dashboard/HelpWidget";

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
  const [renewDialogOpen, setRenewDialogOpen] = useState({});
  const [renewalStatus, setRenewalStatus] = useState({});

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
                id: id || uuidv4(),
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
    setRenewalStatus((prev) => ({ ...prev, [medicationId]: "Pending" }));
    setTimeout(() => {
      setRenewalStatus((prev) => ({ ...prev, [medicationId]: "Approved" }));
    }, 2000);
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

    try {
      const items = Array.from(medications);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      // Update the order in Firebase
      if (user) {
        const updates = {};
        items.forEach((item, index) => {
          updates[`users/${user.uid}/medications/${item.id}/order`] = index;
        });
        update(ref(database), updates);
      }

      setMedications(items);
    } catch (error) {
      console.error("Error updating medication order:", error);
      toast.error("Failed to update medication order");
    }
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
    const timestamp = new Date().toISOString();
    await update(medicationRef, {
      id: medId,
      ...newMed,
      createdAt: timestamp,
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

  const getBadgeType = (med) => {
    const now = new Date();
    let badge = null;
    if (med.expiryDate) {
      const expiry = new Date(med.expiryDate);
      if (expiry < now) badge = "expired";
      else if ((expiry - now) / (1000 * 60 * 60 * 24) < 7) badge = "expiring";
    }
    if (med.refillsLeft !== undefined && med.refillsLeft <= 1) badge = "low";
    return badge;
  };

  const handleScheduleChange = async (medicationId, newSchedule) => {
    try {
      const medicationRef = doc(database, "medications", medicationId);
      await updateDoc(medicationRef, {
        schedule: newSchedule,
        lastUpdated: new Date().toISOString(),
      });

      // Update local state
      setMedications((prev) =>
        prev.map((med) =>
          med.id === medicationId
            ? {
                ...med,
                schedule: newSchedule,
                lastUpdated: new Date().toISOString(),
              }
            : med
        )
      );

      // Show success message
      toast.success("Schedule updated successfully");
    } catch (error) {
      console.error("Error updating schedule:", error);
      toast.error("Failed to update schedule");
    }
  };

  // Prepare medications with history for analytics
  const medicationsWithHistory = medications.map((med) => {
    // If med.history exists, use it. Otherwise, build from lastTaken, createdAt, lastRenewed
    if (med.history) return med;
    const history = [];
    if (med.createdAt) history.push({ date: med.createdAt, type: "added" });
    if (med.lastTaken) history.push({ date: med.lastTaken, type: "taken" });
    if (med.lastRenewed)
      history.push({ date: med.lastRenewed, type: "renewed" });
    return { ...med, history };
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <DashboardBackground>
        <DashboardContainer>
          <WelcomeSection>
            <WelcomeText>
              Welcome back, {user?.displayName || "User"}!
            </WelcomeText>
            <DateText>{new Date().toLocaleDateString()}</DateText>
          </WelcomeSection>

          <AddButton onClick={() => setShowAddModal(true)}>
            + Add Medication
          </AddButton>

          <DashboardGrid>
            <Widget>
              <WidgetTitle>
                <FaClock /> Upcoming Doses
              </WidgetTitle>
              <MedicationList
                medications={medications}
                onDragEnd={onDragEnd}
                onTake={(med) => handleTakeMedication(med.id)}
                onEdit={handleEditMedication}
                onDelete={handleDeleteMedication}
                onRenew={handleRenewPrescription}
                renewalStatus={renewalStatus}
                showRenewDialog={renewDialogOpen}
                setShowRenewDialog={setRenewDialogOpen}
                badgeType={(med) => getBadgeType(med)}
                onScheduleChange={handleScheduleChange}
              />
            </Widget>

            <Widget>
              <WidgetTitle>
                <FaHistory /> Medication History
              </WidgetTitle>
              <MedicationHistory medications={medications} />
            </Widget>

            <Widget>
              <WidgetTitle>
                <FaList /> Recent Actions
              </WidgetTitle>
              <MedicationList
                medications={medications}
                onDragEnd={onDragEnd}
                onTake={(med) => handleTakeMedication(med.id)}
                onEdit={handleEditMedication}
                onDelete={handleDeleteMedication}
                onRenew={handleRenewPrescription}
                renewalStatus={renewalStatus}
                showRenewDialog={renewDialogOpen}
                setShowRenewDialog={setRenewDialogOpen}
                badgeType={(med) => getBadgeType(med)}
                onScheduleChange={handleScheduleChange}
              />
            </Widget>

            <Widget>
              <WidgetTitle>
                <FaPills /> Medications
              </WidgetTitle>
              <MedicationList
                medications={medications}
                onDragEnd={onDragEnd}
                onTake={(med) => handleTakeMedication(med.id)}
                onEdit={handleEditMedication}
                onDelete={handleDeleteMedication}
                onRenew={handleRenewPrescription}
                renewalStatus={renewalStatus}
                showRenewDialog={renewDialogOpen}
                setShowRenewDialog={setRenewDialogOpen}
                badgeType={(med) => getBadgeType(med)}
                onScheduleChange={handleScheduleChange}
              />
            </Widget>
          </DashboardGrid>

          <SectionSpacer />

          <AnalyticsCard>
            <WidgetTitle>
              <FaChartBar /> Adherence Progress
            </WidgetTitle>
            <AdherenceAnalytics medications={medicationsWithHistory} />
          </AnalyticsCard>

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
                <SnoozeButton onClick={handleSnoozeReminder}>
                  Snooze
                </SnoozeButton>
              </NotificationActions>
            </NotificationContainer>
          )}

          {showSnoozeModal && (
            <ModalOverlay>
              <ModalContent>
                <ModalTitle>Snooze or Reschedule Reminder</ModalTitle>
                <div>
                  Choose a snooze duration or set a custom time for your next
                  dose.
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
                  <CancelButton onClick={handleSnoozeCancel}>
                    Cancel
                  </CancelButton>
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
        </DashboardContainer>
      </DashboardBackground>
      <HelpWidget />
    </ProtectedRoute>
  );
}

export default Dashboard;
