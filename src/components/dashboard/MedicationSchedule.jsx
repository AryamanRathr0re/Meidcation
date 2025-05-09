import React, { useState } from "react";
import styled from "styled-components";

const ScheduleContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.18);
  width: 100%;
  max-width: 400px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #7f8c8d;
  cursor: pointer;
  z-index: 10;
  &:hover {
    color: #e74c3c;
  }
`;

const ScheduleForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #2c3e50;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const TimeInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const TimeInputGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const AddTimeButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;

  &:hover {
    background: #e2e8f0;
  }
`;

const RemoveTimeButton = styled.button`
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;

  &:hover {
    background: #fecaca;
  }
`;

const WeekdaySelector = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const WeekdayButton = styled.button`
  background: ${(props) => (props.selected ? "#3498db" : "#f8f9fa")};
  color: ${(props) => (props.selected ? "white" : "#2c3e50")};
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.selected ? "#2980b9" : "#e2e8f0")};
  }
`;

const DosageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DosageButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;

  &:hover {
    background: #e2e8f0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DosageValue = styled.div`
  font-size: 1.25rem;
  color: #2c3e50;
  min-width: 60px;
  text-align: center;
`;

const SaveButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 1rem;

  &:hover {
    background: #2980b9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConfirmationDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(44, 62, 80, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DialogContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.18);
`;

const DialogTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #2c3e50;
`;

const DialogActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
`;

const DialogButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &.confirm {
    background: #3498db;
    color: white;
    &:hover {
      background: #2980b9;
    }
  }

  &.cancel {
    background: #f8f9fa;
    color: #2c3e50;
    &:hover {
      background: #e2e8f0;
    }
  }
`;

function MedicationSchedule({ medication, onSave, onClose }) {
  const [schedule, setSchedule] = useState({
    frequency: medication.frequency || "daily",
    times: medication.times || ["08:00"],
    weekdays: medication.weekdays || [1, 2, 3, 4, 5, 6, 7],
    dosage: medication.dosage || 1,
  });

  const [showDosageConfirm, setShowDosageConfirm] = useState(false);
  const [pendingDosage, setPendingDosage] = useState(null);

  const weekdays = [
    { value: 1, label: "Mon" },
    { value: 2, label: "Tue" },
    { value: 3, label: "Wed" },
    { value: 4, label: "Thu" },
    { value: 5, label: "Fri" },
    { value: 6, label: "Sat" },
    { value: 7, label: "Sun" },
  ];

  const handleFrequencyChange = (e) => {
    const newFrequency = e.target.value;
    setSchedule((prev) => ({
      ...prev,
      frequency: newFrequency,
      weekdays:
        newFrequency === "daily" ? [1, 2, 3, 4, 5, 6, 7] : prev.weekdays,
    }));
  };

  const handleTimeChange = (index, value) => {
    const newTimes = [...schedule.times];
    newTimes[index] = value;
    setSchedule((prev) => ({ ...prev, times: newTimes }));
  };

  const addTime = () => {
    setSchedule((prev) => ({
      ...prev,
      times: [...prev.times, "08:00"],
    }));
  };

  const removeTime = (index) => {
    setSchedule((prev) => ({
      ...prev,
      times: prev.times.filter((_, i) => i !== index),
    }));
  };

  const toggleWeekday = (day) => {
    setSchedule((prev) => ({
      ...prev,
      weekdays: prev.weekdays.includes(day)
        ? prev.weekdays.filter((d) => d !== day)
        : [...prev.weekdays, day].sort(),
    }));
  };

  const adjustDosage = (amount) => {
    const newDosage = schedule.dosage + amount;
    if (newDosage >= 0.5 && newDosage <= 10) {
      setPendingDosage(newDosage);
      setShowDosageConfirm(true);
    }
  };

  const confirmDosageChange = () => {
    setSchedule((prev) => ({ ...prev, dosage: pendingDosage }));
    setShowDosageConfirm(false);
    setPendingDosage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(schedule);
  };

  return (
    <ScheduleContainer>
      {onClose && (
        <CloseButton onClick={onClose} aria-label="Close schedule modal">
          ×
        </CloseButton>
      )}
      <ScheduleForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Frequency</Label>
          <Select value={schedule.frequency} onChange={handleFrequencyChange}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="custom">Custom</option>
          </Select>
        </FormGroup>

        {schedule.frequency === "weekly" && (
          <FormGroup>
            <Label>Days of the Week</Label>
            <WeekdaySelector>
              {weekdays.map((day) => (
                <WeekdayButton
                  key={day.value}
                  selected={schedule.weekdays.includes(day.value)}
                  onClick={() => toggleWeekday(day.value)}
                  type="button"
                >
                  {day.label}
                </WeekdayButton>
              ))}
            </WeekdaySelector>
          </FormGroup>
        )}

        <FormGroup>
          <Label>Times</Label>
          {schedule.times.map((time, index) => (
            <TimeInputGroup key={index}>
              <TimeInput
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(index, e.target.value)}
              />
              {schedule.times.length > 1 && (
                <RemoveTimeButton
                  type="button"
                  onClick={() => removeTime(index)}
                >
                  ×
                </RemoveTimeButton>
              )}
            </TimeInputGroup>
          ))}
          <AddTimeButton type="button" onClick={addTime}>
            + Add Time
          </AddTimeButton>
        </FormGroup>

        <FormGroup>
          <Label>Dosage (units)</Label>
          <DosageContainer>
            <DosageButton
              type="button"
              onClick={() => adjustDosage(-0.5)}
              disabled={schedule.dosage <= 0.5}
            >
              -
            </DosageButton>
            <DosageValue>{schedule.dosage}</DosageValue>
            <DosageButton
              type="button"
              onClick={() => adjustDosage(0.5)}
              disabled={schedule.dosage >= 10}
            >
              +
            </DosageButton>
          </DosageContainer>
        </FormGroup>

        <SaveButton type="submit">Save Schedule</SaveButton>
      </ScheduleForm>

      {showDosageConfirm && (
        <ConfirmationDialog>
          <DialogContent>
            <DialogTitle>Confirm Dosage Change</DialogTitle>
            <p>
              Are you sure you want to change the dosage to {pendingDosage}{" "}
              units?
            </p>
            <DialogActions>
              <DialogButton
                className="cancel"
                onClick={() => setShowDosageConfirm(false)}
                type="button"
              >
                Cancel
              </DialogButton>
              <DialogButton
                className="confirm"
                onClick={confirmDosageChange}
                type="button"
              >
                Confirm
              </DialogButton>
            </DialogActions>
          </DialogContent>
        </ConfirmationDialog>
      )}
    </ScheduleContainer>
  );
}

export default MedicationSchedule;
