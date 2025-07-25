import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.payload.id
    });
    res.json(tasks);
};

export const createTasks = async (req, res) => {
    const { title, description, date } = req.body;
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.payload.id
    });
    const savedTask = await newTask.save();
    res.json({savedTask});
};

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user');
    if(!task) return res.status(404).json({message: "No found task"});
    res.json(task);
};

export const updateTask = async (req, res) => {
    const taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!taskUpdated) return res.status(404).json({message: "No found task for update"});
    res.json(taskUpdated);
};

export const deleteTask = async (req, res) => {
    const taskDeleted = await Task.findByIdAndDelete(req.params.id);
    if(!taskDeleted) return res.status(404).json({message: "No found task for delete"});
    res.sendStatus(204)
};

