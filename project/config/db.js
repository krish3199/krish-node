const mongoose = require("mongoose")

exports.connectDB = () => {
    try {
        mongoose.connect("mongodb://localhost:27017")
        .then(() => console.log("DB is connected successfully.....!!!!"))
        .catch(() => console.log("DB is while connected....!!"))
    } catch (error) {
        console.error(" DB error",error)
    }
}