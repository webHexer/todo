export {};

const express = require("express");
const cors = require("cors");

const todoRouter = require("./routes/todoRoutes");
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/todos", todoRouter);

module.exports = app;
