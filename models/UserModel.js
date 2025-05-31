import {Schema, model} from "mongoose";

const userSchema = new Schema({
    firstName: {type: String, required: true},
    middleName: {type: String},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    department: {type: String},
    role: {type: String, enum: ['admin', 'user'], default: 'user'},
}, {timestamps: true})

const User = model('User', userSchema)
export default User;