const Post = require('../models/Post');

// Yeni yazı oluştur (POST api/posts)
const createPost = async (req, res) => {
    try {
        const { title, content, author, category, blogImage } = req.body;
        const newPost = await Post.create({ title, content, author, category, blogImage });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Tek bir yazıyı getir (GET /api/posts/:id)
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post bulunamadı" });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: "Geçersiz ID" });    }
};

// Yazıyı güncelle (PUT /api/posts/:id)
const updatePost = async (req, res) => {
    try {
        const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updated) return res.status(404).json({ error: "Post bulunamadı" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: "Güncelleme başarısız" });
    }
};

// Yazıyı sil (DELETE /api/posts/:id)

const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Post bulunamadı" });
        res.json(deleted);
    } catch (err) {
        res.status(400).json({ error: "Silme işlemi başarısız" });
    }
};

// Tüm yazıları getir
const getAllPosts = async (req, res) => {
    try {
        const { category, author, q, page = 1, limit = 10 } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (author) filter.author = author;
        
        if(q) filter.$text = { $search: q };

        const skip = (page - 1) * limit;

        const posts = await Post.find(filter)
            .sort({ createdAt: -1 })
            .skip(Number(skip))
            .limit(Number(limit));

        const total = await Post.countDocuments(filter);
        
        res.json({
            total,
            page: Number(page),
            Limit: Number(limit),
            totalPages: Math.ceil(total / limit),
            posts
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createPost, updatePost, deletePost, getPostById, getAllPosts };