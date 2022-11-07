const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    IP: {type: String, default:"192.168 0.1"}
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {UserModel}