import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await axios.get("http://localhost:5000/messages");
    setMessages(res.data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !message) return;

    await axios.post("http://localhost:5000/messages", {
      name,
      message,
    });

    setName("");
    setMessage("");

    fetchMessages();
  };

  return (
    <div className="container">
      <div className="overlay">

        <h1>🌴 Beach Guestbook</h1>

        <p className="subtitle">
          Share your memories, wishes and experiences with everyone.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button type="submit">Sign Guestbook</button>
        </form>

        <div className="messages">
          <h2>📖 Guest Messages</h2>

          {messages.map((msg) => (
            <div className="card" key={msg.id}>
              <div className="card-header">
                <h3>{msg.name}</h3>
                <span>{msg.date}</span>
              </div>

              <p>{msg.message}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;