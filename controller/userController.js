const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
// const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //   res.send("User Created");

  //extract the neccesary values from the body
  console.log(req.body);
  const { name, email, age } = req.body;

  //checking existing user
  const checkUserAlreadyExist = await userModel.findOne({ name });

  if (checkUserAlreadyExist) {
    return res
      .status(400)
      .json({ message: `A user with name ${name} already exist` });
  }

  const newUser = await userModel.create({
    name,
    email,
    age,
  });

  res.status(200).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    age: newUser.age,
  });
  //   res.send("This route is for registering users");
};

/* ****************************************************************  */
//To update a user
const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { _id, name, age } = req.body;

  try {
    // passing the user ID  the
    const updatedUser = await userModel.findOneAndUpdate(
      { _id },
      { name: name, age: age },
      { new: true }
    );
    // checking if the name provided is in the database,
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      age: updatedUser.age,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ****************************************************************  */

/* ****************************************************************  */

/* ****************************************************************  */
/* ****************************************************************  */

//To delete a user
const deleteUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { _id, name, email, age } = req.body;

  try {
    // passing the user ID  the
    const deletedUser = await userModel.findOneAndDelete(
      { _id },
      { name: name, email: email, age: age },
      { new: true }
    );
    // checking if the name provided is in the database,
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `User ID:  ${_id} has been deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ****************************************************************  */
// Function to get all users
const getAllUsers = async (req, res) => {
  const { _id, name, email, age } = req.body;

  try {
    // Use the find() method on the User model to retrieve all users
    const returnedUsers = await userModel.find({});

    if (!returnedUsers) {
      return res.status(404).json({ message: "check your inputs" });
    }

    res.status(200).json({
      returnedUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
};
