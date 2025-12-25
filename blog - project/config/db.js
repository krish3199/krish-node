const mongoose = require("mongoose")

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DB Connected");
    } catch (error) {
        console.error("DB connection error", error.message);
    }
}