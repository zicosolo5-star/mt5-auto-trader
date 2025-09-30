const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let users = [];
let orders = [];

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.send("✅ Registered!");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.json({ token: "FAKE_TOKEN" });
  else res.status(401).send("❌ Invalid credentials");
});

app.post("/api/orders", (req, res) => {
  orders.push(req.body);
  res.send("📩 Order placed!");
});

app.listen(process.env.PORT || 3000, () => console.log("Server running"));