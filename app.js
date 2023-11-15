// nhap
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT // 3000;

// trung gian
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// Kết nối cơ sở dữ liệu
mongoose.connect(process.env.DB_URI)
    .then(() => console.log("Connected to the database!"))
    .catch((err) => console.log(err));
// routes
app.use("/api/post", require("./routes/routes"));
app.use("/api/user", require("./routes/routesUser"))
// bat dau server
app.listen(port, () => console.log('server running at http://localhost:3000'));