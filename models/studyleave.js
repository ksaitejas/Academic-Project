// backend/models/studyLeaveModel.js
import mongoose from "mongoose";

const studyLeaveSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  fid: {
    type: String,
    required: true,
  },
  // name: {
  //   type: String,
  //   required: true,
  // },
  phdtitle: {
    type: String,
    required: true,
  },
  organisation: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  phdprogress: {
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  previousStudyLeave: {
    type: String,
  },
  pdf: {
    type: String,
    required: true,
  },
  hasapproved: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  Genre: {
    type: String,
    required: true,
  },
  insertion: {
    type: Date,
    required: true,
  },
});

const StudyLeaveModel = mongoose.model("StudyLeave", studyLeaveSchema);

export default StudyLeaveModel;
