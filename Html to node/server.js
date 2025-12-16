const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors()); // frontend (index.html) ko allow karega
app.use(express.json()); // JSON body parse

// Fake in-memory database
let todos = [
  { id: 1, text: "Sample: Learn Node.js with Aashi 😎" },
];

let nextId = 2;

// Routes

// Test route
app.get("/", (req, res) => {
  res.send("Krish TODO API is running ✅");
});

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add new todo
app.post("/todos", (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is required" });
  }

  const newTodo = { id: nextId++, text: text.trim() };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Delete todo by id
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const originalLength = todos.length;
  todos = todos.filter((todo) => todo.id !== id);

  if (todos.length === originalLength) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});
