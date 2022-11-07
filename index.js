const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const cors = require("cors");
const PORT = process.env.PORT || 7000;

const {usersRouter} = require("./routes/user.router");
const {todoRouter} = require("./routes/todo.route")
const {connnection} = require("./config/db");
const {authentication} = require("./middlewares/authentication")

const app = express();
app.use(cors());
app.use(express.json());


// user router -sign/log
app.use("/user", usersRouter);

// todo router
app.use("/todos", todoRouter)


// listen
app.listen(PORT, async()=>{
    try{
        await connnection;
        console.log("Connection to DB successfull")
     }catch(e){
        console.log("Error connecting to DB")
    }
    console.log(`listening on port ${PORT}`);
})