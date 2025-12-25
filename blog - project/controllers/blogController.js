const Blog = require("../models/blogModel")
const slugify = require("slugify")

exports.handleAddBlog = async (req, res) => {
    try {
        const { title, content, coverImage, category, tags } = req.body;

        if (!title || !content || !coverImage || !category) {
            return res.status(400).json({ success: false, message: "All Fields require" })
        }

        const slug = slugify(title, { lower: true, strict: true })

        const existingBlog = await Blog.findOne({ slug })
        if (existingBlog) {
            return res.status(409).json({ success: false, message: "Blog already added" })
        }

        const blogData = await Blog.create({
            title,
            content,
            coverImage,
            author: req.user.id,
            category,   
            tags,
            slug
        })

        res.status(201).json({ success: true, message: "Blog added Successfully", blogData })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Add blog Error", error: error.message });
    }
}

exports.getMyBlogs = async (req, res) => {
    try {
        const myBlog = await Blog.find({ author: req.user.id })
        res.status(200).json({ success: true, myBlog })
    } catch (error) {
        return res.status(500).json({ success: false, message: "All blog read Error", error: error.message });
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const { title, content, coverImage, category, tags } = req.body;

        if (!title || !content || !coverImage || !category) {
            return res.status(400).json({ success: false, message: "All Fields are require" })
        }

        const id = req.params.id

        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" })
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You can update only your blog" });
        }

        const slug = slugify(title, { lower: true, strict: true })

        blog.title = title
        blog.slug = slug
        blog.content = content
        blog.coverImage = coverImage
        blog.category = category
        blog.tags = tags

        await blog.save()

        res.status(200).json({ success: true, message: "Blog updated Successfully" })
    } catch (error) {
        res.status(500).json({ message: "Update blog error", error: error.message })
    }
}

exports.removeBlog = async (req, res) => {
    try {
        const id = req.params.id

        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" })
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You can delete only your blog" });
        }

        await blog.deleteOne();

        res.status(200).json({ success: true, message: "Blog delete Successfully" })
    } catch (error) {
        res.status(500).json({ message: "Delete blog error", error: error.message })
    }
}