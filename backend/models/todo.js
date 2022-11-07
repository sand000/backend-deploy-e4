const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    taskname: {type: String, require: true},
    status: {enum: ["pending","done"], type:String, require: true},
    tag: {type: String, require: true},
    user_id: {type: String, required: true}
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = {TodoModel}