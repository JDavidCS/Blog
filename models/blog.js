const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const blogShema = new Shema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogShema);
module.exports = Blog;