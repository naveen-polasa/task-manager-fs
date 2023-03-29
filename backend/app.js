const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const userAuth = require("./middleware/authentication");
app.use(cors());
app.use(express.json());
const connectDB = require("./db/connect");
const authRouter = require("./router/auth");
const tasksRouter = require("./router/tasks");

app.use("/api/auth", authRouter);
app.use("/api/tasks", userAuth, tasksRouter);

const connect = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(5555, () => {
      console.log("started bro");
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
