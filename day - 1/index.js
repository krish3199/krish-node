// const http = require("http")
const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors("http://localhost:5173/"))
// app.get("/home", (req,res)=>{
//     res.send(" <h1>hello krish</h1>")
// })

const student = [
    { id: 1, name: "krish", age: 18 },
    { id: 2, name: "kinjal", age: 20 },
    { id: 3, name: "devrashi", age: 21 },

]

app.get("/getall", (req, res) => {
    res.send(student)
})

app.get("/student/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const stu = student.find((e) => e.id == id)
    if (!stu) {
        return res.status(404).json({ message: "student data not founded.....!!!" })
    }
    res.status(201).json({ message: "student data added successfullly.....!!!", data: stu })
})

app.post("/get", (req, res) => {
    const { name, age } = req.body

    const newstudent = {
        id: student.length + 1,
        name,
        age: parseInt(age)
    }

    student.push(newstudent)
    res.status(201).json({ message: "data add succesfully.....", data: newstudent })
})

app.put("/update/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const stu = student.find((e) => e.id == id)
    const { name, age } = req.body
    if (!stu) {
        return res.status(404).json({ message: "student data not founded.....!!!" })
    }
    stu.name = name
    stu.age = age

    res.status(201).json({ message: "data update successfully.....!!!!", data: stu })

})

app.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const stu = student.findIndex((e) => e.id === id)
    if (stu === -1) {
        return res.status(404).json({ message: "student data not found" })
    }
    student.splice(stu, 1)
    res.status(201).json({ message: "student data deleted successfullly" })
})




// const server = http.createServer((req,res)=>{
//     res.writeHead(200 , {"content-type" : "text/html"})
//     res.write("<h1>hello kinjal </h1>")
//     res.end()
// })

app.listen(4000, (req, res) => {
    console.log("server is working.....!!!")
})