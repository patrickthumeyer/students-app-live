const express = require("express");
const task1 = require("./routes/middleware/task1");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

// Routes
const studentRoutes = require("./routes/students");

app.use(express.json());
app.use("/api", task1);
app.use("/api/students", studentRoutes);

module.exports = app;
