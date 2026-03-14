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
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold">Pathway 1 & 2 AI Tutor</h2>
  
        <div className="min-h-[300px] border border-slate-300 p-4">
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.role === "you" ? "You" : "Bot"}:</strong> {msg.text}
            </p>
          ))}
        </div>
  
        <div className="mt-3 flex gap-2">
          <input
            className="flex-1 rounded border border-slate-300 p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
  
          <button
            onClick={sendMessage}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
