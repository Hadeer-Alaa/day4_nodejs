const express = require("express");
const { Todo, validateTodo } = require("../models/todo");
const { catchAsyncErrors } = require("../middleware")

const router = express.Router();

router.get("/", catchAsyncErrors(async (req, res, next) => {
    const todos = await Todo.find();
    res.json(todos);
}));

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const act = await Todo.findById(id);
    if (!act) return res.status(404).json({ message: "user not found" })
    res.json(act);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    //=> if user not present send 404
    const action = await Todo.findByIdAndDelete(id);
    if (!action) return res.status(404).json({ message: "user not found" })
    res.json(action);
});

router.put("/:id", async (req, res) => {
    const { error } = validateTodo(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })
    const { id } = req.params;
    const { value} = req.body;
    const acti = await Todo.findById(id);
    if (!acti) return res.status(404).json({ message: "user not found" })
    acti.value = value;
    await acti.save();
    res.json(acti);
});

router.post("/", async (req, res) => {
    const { error } = validateTodo(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })
    const newlist = new Todo(req.body);
    await newlist.save();
    res.json(newlist);
});

module.exports = router;
