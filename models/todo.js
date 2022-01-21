const mongoose = require("mongoose");
const Joi = require("joi");

const TodoSchema = new mongoose.Schema({
    value: {
        type: String,
        min:10,
        max: 50,
        required: true,
    },
    
});

const Todo = mongoose.model("Todo", TodoSchema);

const validationSchema = Joi.object({
    value: Joi.string().min(10).max(50).required(),
   
});

const validateTodo = (todo) => {
    return validationSchema.validate(todo)
}

module.exports = { Todo, validateTodo };