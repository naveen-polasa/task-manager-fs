const Task = require("../models/task");

const getTasks = async (req, res) => {
  try {
    const data = await Task.find({});
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const addTask = async (req, res) => {
  try {
    const data = await Task.create(req.body);
    res.status(201).json({ success: true, resp: data });
  } catch (error) {
    res.status(404).json({ success: false });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Task.findByIdAndRemove({ _id: id });
    res.status(200).json({ success: true, resp: data });
  } catch (error) {
    res.status(404).json({ success: false });
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Task.findByIdAndUpdate(id, req.body);
    res.status(200).json({ success: true, resp: data });
  } catch (error) {
    res.status(404).json({ success: false });
  }
};

module.exports = { getTasks, addTask, deleteTask, editTask };
