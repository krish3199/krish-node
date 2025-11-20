const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extends: true }))

const student = [{

    id: 1, name: "krish", age: 20

}]

app.get("/getall", (req, res) => {
    res.send(student)
})


app.get("/student/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const stu = student.find((s) => s.id == id)
    if (!stu) {
        return res.status(404).json({ message: "Student data not found....!!!" })
    }
    res.status(201).json({ message: "Data find successfully....!!!", data: stu })
})


app.post('/get', (req, res) => {
    const { name, age } = req.body

    const newstudent = {
        id: student.length + 1,
        name,
        age: parseInt(age)
    }
    student.push(newstudent)
    res.status(201).json({ message: "student data added successfully", data: newstudent })
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
    res.status(215).json({message : "student data update successfully....!!!", data : stu})
})

app.delete("/delete/:id", (req,res)=>{
     const id = parseInt(req.params.id)
    const stu = student.findIndex((e) => e.id === id)
    if(stu === -1){
        return res.status(401).json({message : "student not data deleted"})
    }
    student.splice(stu,1)
    res.status(200).json({message : "student data deleted succesfully....."})
    
})

app.listen(3000, () => {
    console.log("Server working successfully.....")
})