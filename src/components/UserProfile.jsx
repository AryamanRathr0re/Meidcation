import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  color: #2c3e50;
`;

const ExpandIcon = styled.span`
  font-size: 1.5rem;
  color: #7f8c8d;
  transition: transform 0.2s;
  transform: ${({ expanded }) => (expanded ? "rotate(90deg)" : "rotate(0)")};
`;

const FieldGroup = styled.div`
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
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  min-height: 60px;
  resize: vertical;
`;

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.95rem;
  margin-top: 0.25rem;
`;

const UploadArea = styled.div`
  border: 2px dashed #3498db;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  color: #7f8c8d;
  background: #f8f9fa;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: border 0.2s, background 0.2s;
  &:hover {
    border-color: #2980b9;
    background: #eaf6fb;
  }
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FileItem = styled.li`
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 0.98rem;
`;

const SaveButton = styled.button`
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #2980b9;
  }
`;

function UserProfile() {
  // Expand/collapse state
  const [expanded, setExpanded] = useState({
    personal: true,
    health: false,
    doctor: false,
    prescriptions: false,
  });

  // Form state
  const [profile, setProfile] = useState({
    name: "",
    allergies: "",
    conditions: "",
    doctorName: "",
    doctorPhone: "",
    doctorEmail: "",
    doctorAddress: "",
  });
  const [errors, setErrors] = useState({});

  // Prescription upload state
  const [prescriptions, setPrescriptions] = useState([]);
  const [uploadError, setUploadError] = useState("");

  // Validation
  const validate = (field, value) => {
    switch (field) {
      case "name":
        return value.trim() ? "" : "Name is required.";
      case "doctorEmail":
        return value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
          ? "Invalid email."
          : "";
      case "doctorPhone":
        return value && !/^\+?[0-9\-\s]{7,15}$/.test(value)
          ? "Invalid phone number."
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  // Expand/collapse handler
  const toggleSection = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // File upload handler
  const handleFileDrop = (e) => {
    e.preventDefault();
    setUploadError("");
    const files = Array.from(
      e.dataTransfer ? e.dataTransfer.files : e.target.files
    );
    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const newFiles = [];
    for (let file of files) {
      if (!validTypes.includes(file.type)) {
        setUploadError("Only PDF, JPG, and PNG files are allowed.");
        continue;
      }
      if (file.size > maxSize) {
        setUploadError("File size must be under 5MB.");
        continue;
      }
      newFiles.push(file);
    }
    if (newFiles.length) {
      setPrescriptions((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileInput = (e) => {
    handleFileDrop(e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Save handler (stub)
  const handleSave = (e) => {
    e.preventDefault();
    // Add save logic here (API call, etc.)
    alert("Profile saved!");
  };

  return (
    <Container>
      {/* Personal Info */}
      <Section>
        <SectionHeader onClick={() => toggleSection("personal")}>
          <SectionTitle>Personal Information</SectionTitle>
          <ExpandIcon expanded={expanded.personal}>▶</ExpandIcon>
        </SectionHeader>
        {expanded.personal && (
          <form>
            <FieldGroup>
              <Label>Name *</Label>
              <Input
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
            </FieldGroup>
          </form>
        )}
      </Section>

      {/* Health Info */}
      <Section>
        <SectionHeader onClick={() => toggleSection("health")}>
          <SectionTitle>Health Information</SectionTitle>
          <ExpandIcon expanded={expanded.health}>▶</ExpandIcon>
        </SectionHeader>
        {expanded.health && (
          <form>
            <FieldGroup>
              <Label>Allergies</Label>
              <TextArea
                name="allergies"
                value={profile.allergies}
                onChange={handleChange}
                placeholder="List any allergies..."
              />
            </FieldGroup>
            <FieldGroup>
              <Label>Current Conditions</Label>
              <TextArea
                name="conditions"
                value={profile.conditions}
                onChange={handleChange}
                placeholder="List any current conditions..."
              />
            </FieldGroup>
          </form>
        )}
      </Section>

      {/* Doctor Contact */}
      <Section>
        <SectionHeader onClick={() => toggleSection("doctor")}>
          <SectionTitle>Doctor Contact</SectionTitle>
          <ExpandIcon expanded={expanded.doctor}>▶</ExpandIcon>
        </SectionHeader>
        {expanded.doctor && (
          <form>
            <FieldGroup>
              <Label>Doctor Name</Label>
              <Input
                name="doctorName"
                value={profile.doctorName}
                onChange={handleChange}
              />
            </FieldGroup>
            <FieldGroup>
              <Label>Doctor Phone</Label>
              <Input
                name="doctorPhone"
                value={profile.doctorPhone}
                onChange={handleChange}
                placeholder="e.g. +1234567890"
              />
              {errors.doctorPhone && (
                <ErrorText>{errors.doctorPhone}</ErrorText>
              )}
            </FieldGroup>
            <FieldGroup>
              <Label>Doctor Email</Label>
              <Input
                name="doctorEmail"
                value={profile.doctorEmail}
                onChange={handleChange}
                placeholder="doctor@email.com"
              />
              {errors.doctorEmail && (
                <ErrorText>{errors.doctorEmail}</ErrorText>
              )}
            </FieldGroup>
            <FieldGroup>
              <Label>Doctor Address</Label>
              <TextArea
                name="doctorAddress"
                value={profile.doctorAddress}
                onChange={handleChange}
                placeholder="Address..."
              />
            </FieldGroup>
          </form>
        )}
      </Section>

      {/* Prescription Upload */}
      <Section>
        <SectionHeader onClick={() => toggleSection("prescriptions")}>
          <SectionTitle>Prescription Uploads</SectionTitle>
          <ExpandIcon expanded={expanded.prescriptions}>▶</ExpandIcon>
        </SectionHeader>
        {expanded.prescriptions && (
          <div>
            <UploadArea
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("fileInput").click()}
            >
              Drag & drop files here, or click to select (PDF, JPG, PNG, max
              5MB)
              <input
                id="fileInput"
                type="file"
                multiple
                style={{ display: "none" }}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileInput}
              />
            </UploadArea>
            {uploadError && <ErrorText>{uploadError}</ErrorText>}
            <FileList>
              {prescriptions.map((file, idx) => (
                <FileItem key={idx}>{file.name}</FileItem>
              ))}
            </FileList>
          </div>
        )}
      </Section>

      <SaveButton onClick={handleSave}>Save Profile</SaveButton>
    </Container>
  );
}

export default UserProfile;
