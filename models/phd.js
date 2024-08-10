import mongoose from "mongoose";
const combinedSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    primary: true,
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
    require: true,
  },
  Organisation: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  pdf: {
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
});
const CombinedModel = mongoose.model("CombinedData", combinedSchema);

export default CombinedModel;
