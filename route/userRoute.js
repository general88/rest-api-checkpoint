const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { validate } = require("../models/userModel");
const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controller/userController");

/**************************************************************** */

router.post(
  "/auth/register",
  [
    check("name").trim().notEmpty(),
    check("email").isEmail(),
    check("age").isInt(),
  ],
  createUser
);
router.put(
  "/users/:userId",
  [
    check("userId").trim().notEmpty(),
    check("name").trim().notEmpty(),
    check("email").isEmail(),
    check("age").isInt(),
  ],
  updateUser
);
router.delete(
  "/users/delete",
  [
    check("_id").trim().notEmpty(),
    check("name").trim().notEmpty(),
    check("email").isEmail(),
    check("age").isInt(),
  ],
  deleteUser
);
router.get(
  "/users/get",
    getAllUsers
);

module.exports = router;
