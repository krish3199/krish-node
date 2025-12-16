const express = require('express');
const { isAdmin } = require('../middleware/isAdmin');
const { isAuth } = require('../middleware/isAuth');
const { adminLogin, getbyId, update, deleteUser } = require('../controller/userController');
const router = express.Router();

router.post("/login", adminLogin)
router.get("/get/:id", isAuth, isAdmin, getbyId)
router.put("/update/:id", isAuth, isAdmin, update)
router.delete("/delete/:id", isAuth, isAdmin, deleteUser)

module.exports = router