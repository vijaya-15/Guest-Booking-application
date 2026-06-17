const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let messages = [];

// GET all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// POST new message
app.post("/messages", (req, res) => {
  const { name, message } = req.body;

  const newMessage = {
    id: Date.now(),
    name,
    message
  };

  messages.unshift(newMessage);

  res.json(newMessage);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});