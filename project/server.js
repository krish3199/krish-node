const express = require("express")
const { connectDB } = require("./db/db")
const dotenv = require("dotenv")
const userRouter = require("./routes/userRoutes")
const adminRouter = require("./routes/adminRoutes")
const cookieParser = require("cookie-parser")
const app = express()

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)

connectDB()

app.listen(process.env.PORT , ()=>{
    console.log(`Server is Working on : ${process.env.PORT}`);
})