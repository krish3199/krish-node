const express = require("express")
const { handleAddBlog, updateBlog, removeBlog, getMyBlogs } = require("../controllers/blogController")
const { isAuth } = require("../middleware/isAuth")

const router = express.Router()

router.post("/addBlog", isAuth, handleAddBlog)
router.get("/myBlog", isAuth, getMyBlogs)
router.put("/updateBlog/:id", isAuth, updateBlog)
router.delete("/deleteBlog/:id", isAuth, removeBlog)

module.exports = router