const express = require("express")
const { connectDB } = require("./config/db")
const userRouter = require("./routes/userRoute")
const blogRouter = require("./routes/blogRoute")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/app/user", userRouter)
app.use("/app/blog", blogRouter)

connectDB()

app.listen(process.env.PORT, () => {
    console.log(`Server Running port on ${process.env.PORT}`);
})