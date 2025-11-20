const express = require("express")
const { connectDB } = require("./config/db")
const User = require("./model")
const bcrypt = require("bcryptjs")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.post("/regi", async (req, res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password){
        return res.status(401).json({message:"all filled requried...!!!"})
    }

    const exites = await User.findOne({email})
    if(exites){
        return res.status(401).json({message:"user is already exites....!!!"})
    }
    const hidepass = await bcrypt.hash(String(password),10)
    
    const newUser = await User.create({
        name,
        email,
        password: hidepass
    })

    res.status(201).json({ message: "Data add successfully...!!!", newUser })
})

app.post("/login", async (req,res)=>{
    const{email , password} = req.body

    if(!email || !password){
        return res.status(401).json({message : "Email and password are required...!!!"})
    }
    
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({success: false,message : "User not found...!!!"})
    }

    const pass = await bcrypt.compare(String(password),user.password)
    if(!pass){
        return res.status(401).json({message:"Paaword doesn't match....!!"})
    }

    res.status(201).json({success:true, message:"Log is succesfull..!!!" ,user})

})

app.get("/getall", async(req,res)=>{
    const user = await User.find()
    res.status(201).json({success : true,user})
})


app.get("/get/:id",async(req,res)=>{
    const id = req.params.id

    const user = await User.findById(id)
    if(!user){
        return res.status(401).json({message : "User not a found"})
    }
    res.status(201).json({success : true , user})
})

app.put("/update/:id" ,async (req,res)=>{

    const {name , email} = req.body
    const id = req.params.id
    if(!name || !email){
        return res.status(401).json({message : "name and email is not updated"})
    }
    const user = await User.findByIdAndUpdate(id,{name , email},
        {
            new : true,
            runValidators: true
        }
    )

    if(!user){
        return res.status(401).json({message:"user not found"})
    }

    res.status(201).json({success : true , user})

})

app.delete("/delete/:id" ,async(req,res)=>{
    const id = req.params.id

    const user = await User.findByIdAndDelete(id)

    if(!user){
        return res.status(401).json({message : "data not found"})
    }
    res.status(201).json({success : true , message:"delete succesfully...!!!"})

})


connectDB()



app.listen(5000, () => {
    console.log('server is working on : 5000');
})