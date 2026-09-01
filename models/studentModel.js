import mongoose from "mongoose";
import validator from "validator";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a student name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: 'Phone number must be a valid 10-digit number',
      },
    },
    course: {
      type: String,
      required: [true, 'Please specify a course'],
    },
    age: {
      type: Number,
      required: [true, 'Please add an age'],
      min: [1, 'Age must be greater than 0'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Student', studentSchema);