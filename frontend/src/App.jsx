import { useState } from "react";

export default function App() {
  const [goal, setGoal] = useState("");
  const [breakdown, setBreakdown] = useState("");
  const [loading, setLoading] = useState(false);

  const sendGoal = async () => {
    setLoading(true);
    setBreakdown("");
    try {
      const res = await fetch("http://192.168.1.198:3000/api/breakdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });
      const data = await res.json();
      setBreakdown(data.breakdown);
    } catch (err) {
      console.error(err);
      setBreakdown("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  const steps = breakdown
    ? breakdown.split("\n").filter((line) => line.trim() !== "")
    : [];

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: "700px" }}>
      <h1>ClarityAI</h1>

      <input
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter your goal..."
        style={{ padding: "8px", width: "400px", marginRight: "10px" }}
      />

      <button onClick={sendGoal} disabled={loading}>
        {loading ? "Thinking..." : "Break it down"}
      </button>

      {steps.length > 0 && (
        <ul style={{ marginTop: "20px", lineHeight: "1.8" }}>
          {steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
