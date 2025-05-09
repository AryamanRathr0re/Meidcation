import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { database } from "../firebase";
import { ref, get, child } from "firebase/database";

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  padding: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
`;

const Th = styled.th`
  background: #3498db;
  color: #fff;
  padding: 0.75rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
`;

const Tr = styled.tr``;

const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const dbRef = ref(database);
        // Fetch all users
        const usersSnap = await get(child(dbRef, "users"));
        const medsSnap = await get(child(dbRef, "medications"));
        const users = usersSnap.exists() ? usersSnap.val() : {};
        const medications = medsSnap.exists() ? medsSnap.val() : {};
        // Build user-medication list
        const data = Object.entries(users).map(([uid, user]) => ({
          email: user.email,
          name: user.name || "",
          medications: medications[uid]
            ? Object.values(medications[uid]).map((med) => med.name)
            : [],
        }));
        setUserData(data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Title>Admin Dashboard</Title>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "#e74c3c" }}>{error}</div>}
      {!loading && !error && (
        <Table>
          <thead>
            <Tr>
              <Th>Email</Th>
              <Th>Name</Th>
              <Th>Medications</Th>
            </Tr>
          </thead>
          <tbody>
            {userData.map((user, idx) => (
              <Tr key={idx}>
                <Td>{user.email}</Td>
                <Td>{user.name}</Td>
                <Td>
                  {user.medications.length > 0 ? (
                    user.medications.join(", ")
                  ) : (
                    <span style={{ color: "#888" }}>None</span>
                  )}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminDashboard;
