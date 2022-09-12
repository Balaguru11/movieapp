const Movie = require("../model/MovieModel");
const { createError } = require("./../error");

exports.addNewMovie = async (req, res, next) => {
  try {
    const oldMovie = await Movie.findOne({
      movieName: req.body.movieName.trim().toLowerCase(),
    });
    if (oldMovie) {
      return next(createError("400", "Movie already exists"));
    }
    const newMovie = new Movie({ ...req.body });
    await newMovie.save();
    res.status(200).json({ message: "Movie included successfully" });
  } catch (err) {
    next(err);
  }
};

exports.editMovie = async (req, res, next) => {
  try {
    const foundMovie = await Movie.findById(req.params.movId);
    if (!foundMovie) {
      return next(createError("404", "Movie not found"));
    }
    const updateMov = await Movie.updateOne(
      { _id: req.params.movId },
      {
        $set: req.body,
      }
    );

    if (updateMov) {
      console.log(updateMov);
      return res.status(200).json({ message: "Movie Updated" });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const deleteMov = await Movie.findByIdAndDelete(req.params.movId);
    if (deleteMov) {
      return res.status(200).json({ message: "deleted a movie" });
    }
    return res.status(404).json({ message: "No movie found" });
  } catch (err) {
    next(err);
  }
};
