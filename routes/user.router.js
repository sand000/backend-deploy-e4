const {UserModel} = require("../models/user");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {Router} = require("express");
const usersRouter = Router();
require("dotenv").config()


//  signup
usersRouter.post("/signup", async(req, res) => {
    const {name, email, password} = req.body;
    //  if User already exists
    const isUser = await UserModel.findOne({email});
    if(isUser){
     res.send({msg:"User already exists, try logging in"})
    }
    // else create new user 
    bcrypt.hash(password, 4, async function(err, hash) {
       if(err){
         res.send({msg:"signup failed"});
       }
         const new_user = new UserModel({
             name,
             email,
             password:hash
            });
            try{
               await new_user.save();
               res.send({msg:"user signed up successfully"})
            }catch(err){
               console.log({msg:"something went wrong"})
            }
     });
 })


 
// login 
usersRouter.post("/login", async(req, res) =>{
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    const hash_pass = user.password;
    const user_id = user._id;
   
    bcrypt.compare(password, hash_pass, function(err, result){
        if(err){
            res.send({msg:"something went wrong, try again later"})
        }if(result){
            const token = jwt.sign({user_id}, process.env.SECRET_KEY);
            res.send({message:"Login success",token})
        }else{
            res.send({msg:"Login failed"})
        }
    })
});

// home
usersRouter.get("/", async(req, res)=>{
    const all_users = await UserModel.find();
    res.send(all_users);
});


module.exports = {usersRouter}