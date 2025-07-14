const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');


// Tüm yazıları getir
router.get("/", getAllPosts);
router.post("/", createPost);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);



module.exports = router;