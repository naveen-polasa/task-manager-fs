const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const schema = new mongoose.Schema({
  task: String,
});

const Test = mongoose.model("testing", schema);

app.get("/", async (req, res) => {
  try {
    const data = await Test.find({});
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const data = await Test.create(req.body);
    res.status(201).json({ success: true, resp: data });
  } catch (error) {
    res.status(404).json({ success: false });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Test.findByIdAndRemove({ _id: id });
    res.status(200).json({ success: true, resp: data });
  } catch (error) {
    res.status(404).json({ success: false });
  }
});

app.listen(5555, () => {
  console.log("started bro");
});
