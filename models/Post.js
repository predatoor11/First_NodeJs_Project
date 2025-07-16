const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    content: String,
    blogImage: String,
    author: String,
    category: String
    }, {
    timestamps: true
});

postSchema.index({ title: "text", content: "text" });


module.exports = mongoose.model("Post", postSchema);