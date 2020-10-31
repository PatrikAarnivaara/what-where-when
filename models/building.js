const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "Url is required"],
  },
  title: {
    type: String,
    required: [true, "Prediction is required"],
  },
  description: {
    type: String,
    required: [true, "Prediction is required"],
  },
});

module.exports = mongoose.model("Building", buildingSchema);
