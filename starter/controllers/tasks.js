const tasks = require("../models/tasks");

const getAllTasks = async (req, res) => {
  try {
    const task = await tasks.find({});
    res.status(200).json({task});
  } catch (err) {
    res.status(500).json({msg: err});
  }
};

const createTask = async (req, res) => {
  try {
    const task = await tasks.create(req.body);
    res.status(201).json({task});
  } catch (err) {
    res.status(500).json({msg: err});
  }
};
const getTask = async (req, res) => {
  try {
    const {id: taskID} = req.params;
    //  const
    const task = await tasks.findOne({_id: taskID});
    if (!task) {
      return res.status(404).json({msg: `No task with id : ${taskID}`});
    }
    res.status(200).json({task});
  } catch (err) {
    res.status(500).json({msg: err});
  }
};
const deleteTask = async (req, res) => {
  try {
    const {id: taskID} = req.params;
    const task = await tasks.findOneAndDelete({_id: taskID});
    if (!task) {
      return res.status(404).json({msg: `No task with id : ${taskID}`});
    }
    res.status(200).json({task});
  } catch (err) {
    res.status(500).json({msga: err});
  }
};

const updateTask = async (req, res) => {
  try {
    const {id: taskID} = req.params;
    const task = await tasks.findOneAndUpdate({_id: taskID}, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({msg: `No task with id : ${taskID}`});
    }
    res.status(200).json({task});
  } catch (err) {
    res.status(500).json({msga: err});
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
