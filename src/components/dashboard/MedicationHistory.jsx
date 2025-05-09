import React, { useState, useMemo } from "react";
import styled from "styled-components";

const HistoryContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchBar = styled.div`
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${(props) => (props.active ? "#3498db" : "#f8f9fa")};
  color: ${(props) => (props.active ? "white" : "#2c3e50")};
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${(props) => (props.active ? "#2980b9" : "#e2e8f0")};
  }
`;

const TimelineContainer = styled.div`
  max-height: 600px;
  overflow-y: auto;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 2rem;
  padding-bottom: 2rem;

  &:last-child {
    padding-bottom: 0;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e2e8f0;
  }

  &:after {
    content: "";
    position: absolute;
    left: -4px;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(props) => {
      switch (props.type) {
        case "taken":
          return "#27ae60";
        case "renewed":
          return "#3498db";
        case "added":
          return "#f1c40f";
        default:
          return "#95a5a6";
      }
    }};
  }
`;

const TimelineDate = styled.div`
  font-size: 0.875rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

const TimelineContent = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
`;

const TimelineTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1rem;
`;

const TimelineDetails = styled.p`
  margin: 0;
  color: #7f8c8d;
  font-size: 0.875rem;
`;

function MedicationHistory({ medications }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Create timeline events from medications
  const timelineEvents = useMemo(() => {
    const events = [];

    medications.forEach((med) => {
      // Add medication creation event
      if (med.createdAt) {
        events.push({
          type: "added",
          date: new Date(med.createdAt),
          title: `Added ${med.name}`,
          details: `Dosage: ${med.dosage}, Frequency: ${med.frequency}`,
        });
      }

      // Add last taken event
      if (med.lastTaken) {
        events.push({
          type: "taken",
          date: new Date(med.lastTaken),
          title: `Took ${med.name}`,
          details: `Dosage: ${med.dosage}`,
        });
      }

      // Add renewal events
      if (med.lastRenewed) {
        events.push({
          type: "renewed",
          date: new Date(med.lastRenewed),
          title: `Renewed ${med.name}`,
          details: `Prescription renewed`,
        });
      }
    });

    // Sort events by date (newest first)
    return events.sort((a, b) => b.date - a.date);
  }, [medications]);

  // Filter events based on search and active filter
  const filteredEvents = useMemo(() => {
    return timelineEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.details.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "all" || event.type === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [timelineEvents, searchQuery, activeFilter]);

  return (
    <HistoryContainer>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search medication history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>

      <FilterContainer>
        <FilterButton
          active={activeFilter === "all"}
          onClick={() => setActiveFilter("all")}
        >
          All Events
        </FilterButton>
        <FilterButton
          active={activeFilter === "taken"}
          onClick={() => setActiveFilter("taken")}
        >
          Taken
        </FilterButton>
        <FilterButton
          active={activeFilter === "renewed"}
          onClick={() => setActiveFilter("renewed")}
        >
          Renewed
        </FilterButton>
        <FilterButton
          active={activeFilter === "added"}
          onClick={() => setActiveFilter("added")}
        >
          Added
        </FilterButton>
      </FilterContainer>

      <TimelineContainer>
        {filteredEvents.map((event, index) => (
          <TimelineItem key={index} type={event.type}>
            <TimelineDate>
              {event.date.toLocaleDateString()} at{" "}
              {event.date.toLocaleTimeString()}
            </TimelineDate>
            <TimelineContent>
              <TimelineTitle>{event.title}</TimelineTitle>
              <TimelineDetails>{event.details}</TimelineDetails>
            </TimelineContent>
          </TimelineItem>
        ))}
        {filteredEvents.length === 0 && (
          <div
            style={{ textAlign: "center", color: "#7f8c8d", padding: "2rem" }}
          >
            No events found
          </div>
        )}
      </TimelineContainer>
    </HistoryContainer>
  );
}

export default MedicationHistory;
