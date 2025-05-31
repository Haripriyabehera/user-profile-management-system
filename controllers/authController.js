import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";

const authController = {}

// User Registration
authController.register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {firstName, middleName, lastName, email, password, department, role} = req.body;
    
    try{
        // Create User
        const user = new User({
            firstName,
            middleName,
            lastName,
            email,
            password,
            department,
            role: role || 'user',
        });

        const salt = await bcryptjs.genSalt()
        user.password = await bcryptjs.hash(password, salt)
        await user.save();
        res.status(201).json({message: 'User registered successfully', user})

    }
    catch(error){
        res.status(500).json({message: "Something went wrong"})
    }
}

// User Login
authController.login = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    const {email, password} = req.body;

    try{
        // Find the email
        const user = await User.findOne({email: email})
        if(!user) {
            return res.status(404).json({message: "Invalid email or password"})
        }

        //Match the password
        const isMatch = await bcryptjs.compare(password, user.password)
        if(!isMatch) {
            return res.status(404).json({message: "Invalid email or password"})
        }

        const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.status(200).json({token:`Bearer ${token}`, user: {
            _id: user._id,
            name: `${user.firstName} ${user.lastName}`, 
            email: user.email}})

    }
    catch(error) {
        res.status(500).json({message: 'Server error'});
    }
}

export default authController;