const express = require('express');
const router = express.Router();
const { register, login , getbyId, update, deleteUser, getall, forgotPassword, verifyOTP } = require('../controller/userController');
const upload = require('../middleware/cloudinary');
const { isAuth } = require('../middleware/isAuth');

router.post("/regi", upload.single("avatar"), register)
router.post("/login", login)
router.get("/getall", getall)
router.get("/get/:id", isAuth, getbyId)
router.put("/update/:id", isAuth, update)
router.delete("/delete/:id", isAuth, deleteUser)
router.post("/otp", forgotPassword)
router.post("/verify", isAuth , verifyOTP)
module.exports = router