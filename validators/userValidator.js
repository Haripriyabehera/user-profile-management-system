import User from '../models/UserModel.js';

export const userUpdateSchema = {
  firstName: {
    optional: true,
    notEmpty: { errorMessage: "First name cannot be empty" },
    trim: true
  },
  middleName: {
    optional: true,
    trim: true
  },
  lastName: {
    optional: true,
    notEmpty: { errorMessage: "Last name cannot be empty" },
    trim: true
  },
  email: {
    optional: true,
    isEmail: { errorMessage: "Invalid email format" },
    trim: true,
    normalizeEmail: true,
    custom: {
      options: async (value, { req }) => {
        const existingUser = await User.findOne({ email: value });
        if (existingUser && existingUser._id.toString() !== req.params.id) {
          throw new Error("Email is already taken");
        }
        return true;
      }
    }
  },
  password: {
    optional: true,
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      },
      errorMessage:
        "Password must contain at least one lowercase, one uppercase, one number, one symbol, and be at least 8 characters long"
    },
    trim: true
  },
  department: {
    optional: true,
    trim: true
  }
};
