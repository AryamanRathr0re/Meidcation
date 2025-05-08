import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MedicationCard from "./MedicationCard";

function MedicationList({ medications, onTake, onEdit, onDelete, onDragEnd }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="medications">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {medications.map((medication, index) => (
              <Draggable
                key={medication.id}
                draggableId={medication.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <MedicationCard
                      medication={medication}
                      onTake={() => onTake(medication.id)}
                      onEdit={() => onEdit(medication)}
                      onDelete={() => onDelete(medication)}
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
