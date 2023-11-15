const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: String,
    category: String,
    content: String,
    image: String,
});
module.exports = mongoose.model("Post", postSchema);