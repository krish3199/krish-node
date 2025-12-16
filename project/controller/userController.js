const User = require("../model/model")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils/generateToken")
const { sendOtp } = require("../utils/sendOtp")
const OTP = require("../model/otpModel")

exports.register = async (req, res) =>{
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        return res.status(401).json({message: "All fields are Required !"})
    }
    
    const extuser = await User.findOne({email})
    if (extuser) {
        return res.status(401).json({message: "Email is Already Exist !"})
    }
    const hidePassword = await bcrypt.hash(password, 10) 
 
    if (!req.file) {
        return res.status(401).json({message: "Avatar is not Found !"})
    }
    const newUser = await User.create({ 
        name, 
        email, 
        avatar : req.file.path,
        password: hidePassword
    })
    const token = generateToken(newUser._id, res)
    res.status(201).json({message: "User registered Successfully.",  newUser, token})
}

exports.login = async(req, res)=>{   
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(401).json({message: "Email and Password are Required !"})
    }

    const user = await User.findOne({email}).select("+password")
    if (!user) {
        return res.status(401).json({ success: false, message: "User not Found !"})
    }
    const pass = await bcrypt.compare(password, user.password)
    if (!pass) {
        return res.status(401).json({message: "password doesn't match !"})
    }
    const token = generateToken(user._id, res)
    res.status(201).json({ success: true, message: "Log in Successfull.", user, token})
}

exports.getall = async(req, res)=>{
    const allUser = await User.find()
    res.status(201).json({success: true, allUser})
}
 
exports.getbyId = async(req, res)=>{
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {
        return res.status(400).json({message: "User not Found !"})
    }
    res.status(201).json({success: true, user})
}

exports.update = async(req, res)=>{
    const {name , email} = req.body
    if (!name || !email) {
        return res.status(401).json({message: "All fields are Required"})
    }
    const id = req.params.id
    const user = await User.findByIdAndUpdate(id,{name, email},
    {
        new : true,
        runValidators: true
    }
    )
    if (!user) {
        return res.status(401).json({message: "User not Found !"})
    }
    res.status(201).json({success: true, user})
}

exports.deleteUser = async(req, res)=>{
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    if (!user) {
        return res.status(401).json({message: "User not Found !"})
    }
    res.status(201).json({success: true , message: "Deleted Successfully." })
}

exports.adminLogin = async(req, res)=>{   
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(401).json({message: "Email and Password are Required !"})
    }

    const user = await User.findOne({email , isAdmin: true}).select("+password")
    if (!user) {
        return res.status(401).json({ success: false, message: "User not Found !"})
    }
    const pass = await bcrypt.compare(password, user.password)
    if (!pass) {
        return res.status(401).json({message: "password doesn't match !"})
    }
    const token = generateToken(user.id, res)
    res.status(201).json({ success: true, message: "Log in Successfull.", user, token})
}


exports.forgotPassword = async(req, res)=>{
    const {email} = req.body

    if (!email) {
        return res.status(401).json({message: "Email noT Found !"})
    }
    const user = await User.findOne({email})
    if (!user) {
        return res.status(401).json({message: "User not Found !"})
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    await OTP.findOneAndUpdate(
        {email},
        {email, otp, expireAt: Date.now() + 5 * 60 * 1000},
        {upsert: true}
    )
    console.log(otp);
    await sendOtp({
        email,
        subject: "OTP Send Successfully.",
        message: `<h1>OTP ${otp}</h1>`
    })
res.status(201).json({message: "OTP Send Successfully."})   
}

exports.verifyOTP = async(req, res) =>{
    try {
        const {email, otp,password,confirmPassword} = req.body
        if (!email || !otp || !password || !confirmPassword) {
            return res.status(401).json({message: "All Fields are Reqired....!!!!"})
        }
        const checkOTP = await OTP.findOne({email})
        
        if(!checkOTP){
            return res.status(401).json({message : "Otp is not a found....!!!"})

        }
        if(checkOTP.otp !== otp){
            return res.status(401).json({message : "Otp invalid.....!!!!"})
        }
        if(checkOTP.expireAt < Date.now()){
            return res.status(401).json({message : "Otp was expired.....!!!!"})
        }
        if(password !== confirmPassword){
            return res.status(401).json({message : "Otp is dose not matched!!!!"})
        }

        const match = await bcrypt.hash(password,10)
        user.password = match

        
        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({message: "User not Found !"})
        }
        
        await user.save()
        await OTP.deleteOne({email})
        res.status(201).json({message : "otp veriffy successfull...."})
        
    } catch (error) {
        
    }
}