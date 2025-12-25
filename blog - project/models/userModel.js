const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is require"]
    },
    email: {
        type: String,
        require: [true, "Email is require"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "Password is require"]
    },
}, { timestamps: true })
module.exports = mongoose.model("User", userSchema)