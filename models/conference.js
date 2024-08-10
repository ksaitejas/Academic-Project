import mongoose from "mongoose";

const researchPaperSchema = new mongoose.Schema({
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
  paperTitle: {
    type: String,
    required: true,
  },
  firstAuthor: {
    type: String,
    required: true,
  },
  conferenceName: {
    type: String,
    required: true,
  },
  publisherName: {
    type: String,
    required: true,
  },
  hasapproved: {
    type: String,
    required: true,
  },
  pdf: {
    type: String, // Assuming you store file paths in an array of strings
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  insertion: {
    type: Date,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const ResearchPaperModel = mongoose.model("ResearchPaper", researchPaperSchema);

export default ResearchPaperModel;
