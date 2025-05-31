import User from "../models/UserModel.js";

// Register validator
export const userRegisterSchema = {
    firstName: {
        exists: { errorMessage: "First name is required" },
        notEmpty: { errorMessage: "First name cannot be empty" },
        trim: true,
    },
    middleName: {
        optional: true,
        trim: true,
    },
    lastName: {
        exists: { errorMessage: "Last name is required" },
        notEmpty: { errorMessage: "Last name cannot be empty" },
        trim: true,
    },
    email: {
        in: ['body'],
        exists: { errorMessage: "Email is required" },
        notEmpty: { errorMessage: "Email cannot be empty" },
        isEmail: { errorMessage: "Email should be in a valid format" },
        trim: true,
        normalizeEmail: true,
        custom: {
            options: async (value) => {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error("Email is already taken");
                }
                return true;
            }
        }
    },
    password: {
        exists: { errorMessage: "Password is required" },
        notEmpty: { errorMessage: "Password cannot be empty" },
        isStrongPassword: {
            options: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            },
            errorMessage:
                "Password must contain at least one lowercase, one uppercase, one number, one symbol, and be at least 8 characters long"
        },
        trim: true,
    },
    department: {
        optional: true,
        trim: true,
    },
    role: {
        optional: true,
        isIn: {
            options: [['admin', 'user']],
            errorMessage: "Role must be either 'admin' or 'user'"
        },
        trim: true,
    }
};

// Login validator
export const userLoginSchema = {
    email: {
        in: ['body'],
        exists: { errorMessage: "Email field is required" },
        notEmpty: { errorMessage: "Email cannot be empty" },
        isEmail: { errorMessage: "Email should be in a valid format" },
        trim: true,
        normalizeEmail: true,
    },
    password: {
        exists: { errorMessage: "Password is required" },
        notEmpty: { errorMessage: "Password cannot be empty" },
        trim: true,
    }
};
