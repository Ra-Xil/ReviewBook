
const User = require('../models/user');

const UserController = {
    async fetchUserByID(req, res) {
        const id = req.params.id;
        try {
            const post = await User.findById(id);
            res.status(200).json(post);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    },
    async fetchAllUser(req, res) {
        try {
            const posts = await User.find();
            res.status(200).json(posts);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    },
    async login(req, res) {
        const { username, password } = req.body;

        try {
            // Tìm người dùng trong cơ sở dữ liệu bằng tên người dùng
            const user = await User.findOne({ username });

            // Kiểm tra nếu không tìm thấy người dùng hoặc mật khẩu không hợp lệ
            if (!user || !await user.isValidPassword(password)) {
                return res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không đúng.' });
            }
        } catch (error) {
            console.error('Đăng nhập thất bại:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng nhập.' });
        }
    }
};

module.exports = UserController;
