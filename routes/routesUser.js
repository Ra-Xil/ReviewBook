const express = require("express");
const router = express.Router();
const User = require("../controllers/user");

router.get("/", User.fetchAllUser);
router.get("/:id", User.fetchUserByID);
router.post("/", User.login);
module.exports = router;