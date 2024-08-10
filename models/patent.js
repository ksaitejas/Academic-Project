import mongoose from "mongoose";

const patentSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  fid: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  patentTitle: {
    type: String,
    required: true,
  },
  patentId: {
    type: String,
    required: true,
  },
  patentDate: {
    type: Date,
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  hasapproved: {
    type: String,
    required: true,
  },
  insertion: {
    type: Date,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
});

const PatentModel = mongoose.model("Patent", patentSchema);

export default PatentModel;
