const {TodoModel } = require("../models/todo");
const {Router} = require("express");
const todoRouter = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {authentication} = require("../middlewares/authentication")


// post todos
todoRouter.post("/", authentication, async(req, res) =>{
       let new_todo = req.body;
       let result = new TodoModel(new_todo);
       await result.save();
       res.send("created note")
});

// update todo
todoRouter.patch("/:todoID", async(req, res) =>{
    const token = req.headers?.authorization?.split(" ")[1]
    
    const id = req.params.todoID;
    try {
        var decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decoded.email)
        let mail = decoded.email
        let data = req.body;
        let result = await TodoModel.updateOne({ id: id, email: mail },  { $set: data });
        res.send(result);
    } catch (err) {
        console.log(err);
    }

})

// delete
todoRouter.delete("/:todoID", async (req, res) =>{
    const token = req.headers?.authorization?.split(" ")[1]

    try {
        var decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded.email)
        let mail = decoded.email
        let result = await TodoModel.deleteOne({ _id: req.params.todoID , email: mail});
        res.send("Todo Deleted");
      } catch (err) {
        console.log(err);
      }
});

// get all todos
todoRouter.get("/", authentication, async(req, res)=>{
    const all_todos = await TodoModel.find();
    res.send(all_todos);
});


// filter by status-pending
todoRouter.get("/", async(req, res)=>{
    let result = await TodoModel.find({ status: "pending"});
    console.log(result)
    res.send(result);
})

// filter by status-done
todoRouter.get("/", async(req, res)=>{
    try{
        let result = await TodoModel.find({ status: "done"});
        res.send(result);
    }catch(e){
        res.send("err")
    } 
});

// filter by id
todoRouter.get("/:todoID", async (req, res) =>{
    try {
        let result = await TodoModel.findOne({ _id: req.params.todoID , email: mail});
        res.send(result);
      } catch (err) {
        console.log(err);
      }
});

module.exports = {todoRouter};
