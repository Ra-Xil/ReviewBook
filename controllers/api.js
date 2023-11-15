const Post = require("../models/post");
const fs = require("fs");
module.exports = class API {
    // Lấy tất cả dữ liệu
    static async fetchAllPost(req, res) {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    // Lấy Id
    static async fetchPostByID(req, res) {
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            res.status(200).json(post);
        } catch (err) {
            res.status(404).json({ message: err.message});
        }
    }
    // Tạo dữ liệu
    static async createPost(req, res) {
        const post = req.body;
        const imagename = req.file.filename;
        post.image = imagename;
        try {
            await Post.create(post);
            res.status(201).json({ message: 'Đã tạo bài đăng thành công' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    // Cập nhật dữ liệu
    static async updatePost(req, res) {
        const id = req.params.id;
        let new_image = '';
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync("./uploads/" + req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }
        const newPost = req.body;
        newPost.image = new_image;

        try {
            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({ message: "Đã cập nhật bài đăng thành công" });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    // xóa dữ liệu
    static async deletePost(req, res) {
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
            if (result.image != '') {
                try {
                    fs.unlinkSync('./uploads/' + result.image);                   
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({ message: "Xóa bài viết thành công" });
         } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
};