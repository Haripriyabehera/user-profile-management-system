import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";

const adminController = {};

// Get any profile (admin or user) by ID
adminController.getProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin can update any profile
adminController.updateUserByAdmin = async (req, res) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, middleName, lastName, email, password, department, role } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (middleName !== undefined) user.middleName = middleName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (department !== undefined) user.department = department;

    // Only admin can update role
    if (role) user.role = role;

    if (password) {
      const salt = await bcryptjs.genSalt();
      user.password = await bcryptjs.hash(password, salt);
    }

    await user.save();
    const updatedUser = user.toObject();
    delete updatedUser.password;

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default adminController;
