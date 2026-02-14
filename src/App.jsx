import { useState } from "react";

export default function App() {
  const WORKER_URL = import.meta.env.VITE_WORKER_URL;
  const APP_SECRET = import.meta.env.VITE_APP_SECRET;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Ask me something from Pathway 1 or 2." },
  ]);

  async function sendMessage() {
    const message = input.trim();
    if (!message) return;

    setMessages((prev) => [...prev, { role: "you", text: message }]);
    setInput("");

    try {
      const response = await fetch(`${WORKER_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-App-Secret": APP_SECRET,
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "Error: " + (data.error || "Unknown error") },
        ]);
        return;
      }

      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Could not connect to server." },
      ]);
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Pathway 1 & 2 AI Tutor</h2>

      <div style={{ border: "1px solid #ccc", padding: 15, minHeight: 300 }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.role === "you" ? "You" : "Bot"}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
        <input
          style={{ flex: 1, padding: 10 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button onClick={sendMessage} style={{ padding: "10px 15px" }}>
          Send
        </button>
      </div>
    </div>
  );
}
