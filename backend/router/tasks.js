const express = require("express");
const {
  getTasks,
  addTask,
  deleteTask,
  editTask,
} = require("../controllers/tasks");
const router = express.Router();

router.route("/").get(getTasks).post(addTask);
router.route("/:id").delete(deleteTask).patch(editTask);

module.exports = router;
