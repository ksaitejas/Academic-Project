import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  Department: {
    type: String,
    required: true
  },
  Designation: {
    type: String,
    required: true
  },
  Name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    requried: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  Gender: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  });

const User = mongoose.model('User', userSchema);

export default User;