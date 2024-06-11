const express = require("express");
const { validateRegister, validateLogin } = require("../utils/validators/auth");
const { register } = require("../controllers/RegisterController");
const { login } = require("../controllers/LoginController");
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;
