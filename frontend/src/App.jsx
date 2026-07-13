import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");
  const [answers, setAnswers] = useState({
    relationship: "",
    addiction: "",
    severity: "",
    awareness: "",
    livesWithYou: "",
    household: [],
    challenges: [],
    peoplesPlaces: [],
    peoplesPlacesDetail: "",
    giveCash: "",
    coverForThem: "",
    emptyThreats: "",
    avoidConflict: "",
    violence: "",
  });

  const update = (key, value) => setAnswers((prev) => ({ ...prev, [key]: value }));

  const toggleArray = (key, value) => {
    setAnswers((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const generatePlan = async () => {
    setLoading(true);
    setPlan("");
    try {
      const res = await fetch("http://192.168.1.197:3000/api/breakdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: JSON.stringify(answers) }),
      });
      const data = await res.json();
      setPlan(data.breakdown);
    } catch (err) {
      setPlan("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  const btn = (label, key, value) => (
    <button
      key={value}
      onClick={() => update(key, value)}
      style={{
        margin: "6px",
        padding: "10px 18px",
        borderRadius: "8px",
        border: answers[key] === value ? "2px solid #2563eb" : "1px solid #ccc",
        background: answers[key] === value ? "#eff6ff" : "#fff",
        color: answers[key] === value ? "#1d4ed8" : "#333",
        cursor: "pointer",
        fontWeight: answers[key] === value ? "600" : "400",
      }}
    >
      {label}
    </button>
  );

  const chk = (label, key, value) => (
    <button
      key={value}
      onClick={() => toggleArray(key, value)}
      style={{
        margin: "6px",
        padding: "10px 18px",
        borderRadius: "8px",
        border: answers[key].includes(value) ? "2px solid #2563eb" : "1px solid #ccc",
        background: answers[key].includes(value) ? "#eff6ff" : "#fff",
        color: answers[key].includes(value) ? "#1d4ed8" : "#333",
        cursor: "pointer",
        fontWeight: answers[key].includes(value) ? "600" : "400",
      }}
    >
      {label}
    </button>
  );

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const navBtns = (canNext = true) => (
    <div style={{ marginTop: "2rem", display: "flex", gap: "12px" }}>
      {step > 1 && (
        <button onClick={back} style={{ padding: "10px 24px", borderRadius: "8px", border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}>
          Back
        </button>
      )}
      {canNext && (
        <button onClick={step === 6 ? generatePlan : next} style={{ padding: "10px 24px", borderRadius: "8px", border: "none", background: "#2563eb", color: "#fff", cursor: "pointer", fontWeight: "600" }}>
          {step === 6 ? "Generate My Plan" : "Next"}
        </button>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "3rem 2rem", fontFamily: "system-ui, sans-serif", color: "#111" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "0.25rem" }}>Still Here</h1>
      <p style={{ color: "#aaa", marginBottom: "2.5rem" }}>A recovery support guide for families and loved ones</p>

      {step === 1 && (
        <div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Who are you to this person?</h2>
          <div>
            {["Parent", "Spouse / Partner", "Sibling", "Friend", "Other"].map((r) => btn(r, "relationship", r))}
          </div>
          {navBtns(!!answers.relationship)}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>What are they addicted to?</h2>
          <div>{["Alcohol", "Opioids", "Meth", "Cocaine", "Pills / Benzos", "Other"].map((r) => btn(r, "addiction", r))}</div>

          <h2 style={{ fontSize: "1.2rem", margin: "1.5rem 0 1rem" }}>How severe is it?</h2>
          <div>{["Mild", "Moderate", "Severe", "I don't know"].map((r) => btn(r, "severity", r))}</div>

          <h2 style={{ fontSize: "1.2rem", margin: "1.5rem 0 1rem" }}>Are they aware they have a problem?</h2>
          <div>{["Yes", "In denial", "Somewhere in between"].map((r) => btn(r, "awareness", r))}</div>

          {navBtns(!!(answers.addiction && answers.severity && answers.awareness))}
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Do they live with you?</h2>
          <div>{["Yes", "No"].map((r) => btn(r, "livesWithYou", r))}</div>

          <h2 style={{ fontSize: "1.2rem", margin: "1.5rem 0 1rem" }}>Who else is in the home?</h2>
          <div>{["Children", "Other adults", "Nobody else"].map((r) => chk(r, "household", r))}</div>

          {navBtns(!!answers.livesWithYou)}
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>We want to give you the most accurate plan.</h2>
          <p style={{ color: "#aaa", marginBottom: "1rem" }}>Answer honestly — there are no wrong answers.</p>

          {[
            ["Do you ever give them cash when they ask?", "giveCash"],
            ["Do you cover for them — make excuses, call in sick for them?", "coverForThem"],
            ["Do you threaten consequences but not follow through?", "emptyThreats"],
            ["Do you avoid conflict just to keep the peace?", "avoidConflict"],
          ].map(([q, key]) => (
            <div key={key} style={{ marginBottom: "1.25rem" }}>
              <p style={{ marginBottom: "0.5rem", fontWeight: "500" }}>{q}</p>
              <div>{["Yes", "No", "Sometimes"].map((r) => btn(r, key, r))}</div>
            </div>
          ))}

          {navBtns(!!(answers.giveCash && answers.coverForThem && answers.emptyThreats && answers.avoidConflict))}
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>What's the hardest part right now?</h2>
          <div>{["I don't know how to talk to them", "I keep enabling them", "There is sometimes violence", "They are in complete denial", "I want to plan an intervention"].map((r) => chk(r, "challenges", r))}</div>

          <h2 style={{ fontSize: "1.2rem", margin: "1.5rem 0 1rem" }}>Are there people or places that are a problem?</h2>
          <div>{["A partner who uses", "Using friends", "A specific location", "Not sure"].map((r) => chk(r, "peoplesPlaces", r))}</div>

          <h2 style={{ fontSize: "1.2rem", margin: "1.5rem 0 0.5rem" }}>Anything specific you want us to know?</h2>
          <textarea
            value={answers.peoplesPlacesDetail}
            onChange={(e) => update("peoplesPlacesDetail", e.target.value)}
            placeholder="Optional — describe people, places, or anything else..."
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", minHeight: "80px", fontFamily: "inherit", fontSize: "14px" }}
          />

          {navBtns(true)}
        </div>
      )}

      {step === 6 && (
        <div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Ready to generate your plan</h2>
          <p style={{ color: "#aaa", marginBottom: "2rem" }}>Based on everything you shared, we'll create a personalized recovery support plan for you and your loved one.</p>
          {navBtns(true)}
        </div>
      )}

      {loading && (
        <div style={{ marginTop: "2rem", color: "#2563eb" }}>Building your personalized plan...</div>
      )}

      {plan && (
        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Your Recovery Support Plan</h2>
          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", color: "#eee" }}>{plan}</div>
        </div>
      )}
    </div>
  );
}
