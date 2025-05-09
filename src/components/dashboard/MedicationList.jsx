import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MedicationCard from "./MedicationCard";

function MedicationList({
  medications,
  onTake,
  onEdit,
  onDelete,
  onRenew,
  renewalStatus,
  showRenewDialog,
  setShowRenewDialog,
  badgeType,
  onScheduleChange,
  onDragEnd,
}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (medications && medications.length > 0) {
      setItems(
        medications.map((med, index) => ({
          ...med,
          draggableId: `med-${med.id || index}`,
        }))
      );
    }
  }, [medications]);

  if (!items || items.length === 0) {
    return <div>No medications found</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="medications-list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: "50px" }}
          >
            {items.map((medication, index) => (
              <Draggable
                key={medication.draggableId}
                draggableId={medication.draggableId}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: "10px",
                    }}
                  >
                    <MedicationCard
                      medication={medication}
                      onTake={() => onTake(medication)}
                      onEdit={() => onEdit(medication)}
                      onDelete={() => onDelete(medication)}
                      onRenew={() => onRenew(medication.id)}
                      renewalStatus={renewalStatus?.[medication.id]}
                      showRenewDialog={showRenewDialog === medication.id}
                      setShowRenewDialog={(show) =>
                        setShowRenewDialog(show ? medication.id : null)
                      }
                      badgeType={badgeType}
                      onScheduleChange={onScheduleChange}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default MedicationList;
