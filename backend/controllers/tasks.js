const Task = require("../models/task");

const getTasks = async (req, res) => {
  try {
    const data = await Task.find({ createdBy: req.user.userId });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const addTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  try {
    console.log(req.body);
    const data = await Task.create(req.body);
    res.status(201).json({ data });
  } catch (error) {
    res.status(404).json({ success: false });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Task.findByIdAndRemove({ _id: id });
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ msg: error.message });
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
