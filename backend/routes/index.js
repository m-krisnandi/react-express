const express = require("express");
const { validateRegister, validateLogin } = require("../utils/validators/auth");
const { validateUser } = require("../utils/validators/user");
const verifyToken = require("../middlewares/auth");
const { register } = require("../controllers/RegisterController");
const { login } = require("../controllers/LoginController");
const {
  findUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/admin/users", verifyToken, findUsers);
router.post("/admin/users", verifyToken, validateUser, createUser);
router.get("/admin/users/:id", verifyToken, findUserById);
router.put("/admin/users/:id", verifyToken, validateUser, updateUser);
router.delete("/admin/users/:id", verifyToken, validateUser, deleteUser);

module.exports = router;
