import React, { useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const pop = keyframes`
  0% { transform: scale(0.8); opacity: 0.5; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const Badge = styled.div`
  background: #f1c40f;
  color: #fff;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(241, 196, 15, 0.15);
  animation: ${pop} 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
`;

const BadgeLabel = styled.span`
  font-size: 0.9rem;
  color: #2c3e50;
  font-weight: 500;
  margin-top: 0.5rem;
  text-align: center;
`;

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  height: 220px;
`;

function getWeekKey(date) {
  // Returns 'YYYY-WW' for a given date
  const d = new Date(date);
  const year = d.getFullYear();
  const firstJan = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - firstJan) / (24 * 60 * 60 * 1000));
  const week = Math.ceil((days + firstJan.getDay() + 1) / 7);
  return `${year}-W${week}`;
}

function calculateAdherence(medications) {
  // Returns { [weekKey]: { taken: X, scheduled: Y } }
  const adherence = {};
  medications.forEach((med) => {
    // Assume med.history is an array of { date, type } events
    if (!med.history) return;
    med.history.forEach((event) => {
      const week = getWeekKey(event.date);
      if (!adherence[week]) adherence[week] = { taken: 0, scheduled: 0 };
      if (event.type === "taken") adherence[week].taken += 1;
      adherence[week].scheduled += 1; // Assume every event is a scheduled dose
    });
  });
  return adherence;
}

function getBadges(adherence) {
  // Example: 7-day streak, 90%+ week, 100% week
  const badges = [];
  const weeks = Object.keys(adherence);
  let streak = 0;
  weeks.forEach((w) => {
    const { taken, scheduled } = adherence[w];
    if (scheduled > 0 && taken === scheduled) {
      streak++;
    } else {
      streak = 0;
    }
    if (scheduled > 0 && taken / scheduled >= 0.9) {
      badges.push({ icon: "🏅", label: `90%+ Adherence (${w})` });
    }
    if (scheduled > 0 && taken === scheduled) {
      badges.push({ icon: "🌟", label: `Perfect Week (${w})` });
    }
    if (streak >= 2) {
      badges.push({ icon: "🔥", label: `${streak} Week Streak!` });
    }
  });
  // Remove duplicates
  return badges.filter(
    (b, i, arr) => arr.findIndex((x) => x.label === b.label) === i
  );
}

const AdherenceAnalytics = ({ medications }) => {
  // medications: [{ name, history: [{date, type}] }]
  const adherence = useMemo(
    () => calculateAdherence(medications),
    [medications]
  );
  const chartData = useMemo(() => {
    const labels = Object.keys(adherence);
    return {
      labels,
      datasets: [
        {
          label: "% Adherence",
          data: labels.map((w) => {
            const { taken, scheduled } = adherence[w];
            return scheduled > 0 ? Math.round((taken / scheduled) * 100) : 0;
          }),
          backgroundColor: "#3498db",
        },
      ],
    };
  }, [adherence]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Weekly Medication Adherence (%)" },
    },
    scales: {
      y: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } },
    },
  };

  const badges = useMemo(() => getBadges(adherence), [adherence]);

  return (
    <Container>
      <SectionTitle>Adherence Progress</SectionTitle>
      <ChartWrapper>
        <Bar data={chartData} options={chartOptions} height={220} />
      </ChartWrapper>
      <BadgeRow>
        {badges.length === 0 && <span>No badges yet. Stay consistent!</span>}
        {badges.map((badge, idx) => (
          <Badge key={idx}>
            {badge.icon}
            <BadgeLabel>{badge.label}</BadgeLabel>
          </Badge>
        ))}
      </BadgeRow>
    </Container>
  );
};

export default AdherenceAnalytics;
