const tasks = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const {createCustom} = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const task = await tasks.find({});
  res.status(200).json({task, amount: tasks.length});
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await tasks.create(req.body);
  res.status(201).json({task});
});

const getTask = asyncWrapper(async (req, res, next) => {
  const {id: taskID} = req.params;
  const task = await tasks.findOne({_id: taskID});
  if (!task) {
    return next(createCustom(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({task});
});

const deleteTask = asyncWrapper(async (req, res) => {
  const {id: taskID} = req.params;
  const task = await tasks.findOneAndDelete({_id: taskID});
  if (!task) {
    return res.status(404).json({msg: `No task with id : ${taskID}`});
  }
  res.status(200).json({task});
});

const updateTask = asyncWrapper(async (req, res) => {
  const {id: taskID} = req.params;
  const task = await tasks.findOneAndUpdate({_id: taskID}, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({msg: `No task with id : ${taskID}`});
  }
  res.status(200).json({task});
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
