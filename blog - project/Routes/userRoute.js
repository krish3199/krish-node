const express = require("express")
const { handleRegister, handleLogin, forgotPassword, resetPassword, verifyOTP } = require("../controllers/userController")

const router = express.Router()

router.post("/register", handleRegister)
router.post("/login", handleLogin)
router.post("/forgotPassword", forgotPassword)
router.post("/verifyOTP", verifyOTP)
router.post("/resetPassword", resetPassword)

module.exports = router