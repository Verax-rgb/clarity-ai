import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");

  const sendPrompt = async () => {
    try {
      const res = await fetch("http://192.168.1.198:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (err) {
      console.error(err);
      setReply("Error connecting to backend");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>AI App</h1>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type something"
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
      />

      <button onClick={sendPrompt}>Send</button>

      <p style={{ marginTop: "20px" }}>
        <strong>Reply:</strong> {reply}
      </p>
    </div>
  );
}
