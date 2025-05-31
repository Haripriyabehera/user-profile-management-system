import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";

const userController = {};

//  Get Profile
userController.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//  Update Profile
userController.updateProfile = async (req, res) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, middleName, lastName, email, password, department } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update only if fields are provided
        if (firstName) user.firstName = firstName;
        if (middleName !== undefined) user.middleName = middleName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if(role) 
        if (department !== undefined) user.department = department;

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

export default userController;

