const Movie = require("../models/movie");
const NotFoundError = require("../errors/error-not-found");
const ValidationError = require("../errors/error-validation");
const ForbiddenError = require("../errors/error-forbidden");

const { OK, CREATED } = require("../errors/errors");

const getUserMovies = (req, res, next) => {
  return Movie.find({ owner: req.user._id })
    .then((movies) => res.status(OK).send(movies))
    .catch(next);
};

const createUserMovie = (req, res, next) => {
<<<<<<< HEAD
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
=======
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
  Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
>>>>>>> 9685ea2656b2fb111f363d1dfbcf14501a96924d
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new ValidationError("Данные некорректны"));
      }
      return next(err);
    });
};

const deleteUserMovie = (req, res, next) => {
  return Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError("Фильм не найден!");
      }
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError("Нельзя удалить чужой фильм");
      }
      return Movie.deleteOne().then(() =>
        res.status(OK).send({ message: "Фильм удален." })
      );
    })
    .catch(next);
};

module.exports = {
  deleteUserMovie,
  getUserMovies,
  createUserMovie,
};
