const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    movieName: { type: String, required: true, unique: true, lowercase: true },
    rating: { type: Number, required: true },
    cast: [
      {
        type: String,
        required: true,
      },
    ],
    genre: { type: String, required: true },
    releasedOn: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
