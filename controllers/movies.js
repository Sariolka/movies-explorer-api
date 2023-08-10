const Movie = require('../models/movie');
const NotFoundError = require('../errors/error-not-found');
const ValidationError = require('../errors/error-validation');
const ForbiddenError = require('../errors/error-forbidden');


const { OK, CREATED } = require('../errors/errors');

const getUserMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(OK).send(movies))
    .catch(next);
};

const createUserMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(ValidationError('Данные некорректны'));
      }
      next(err);
    });
};

const deleteUserMovie = (req, res, next) => {
  const id = req.params.movieId;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден!');
      }
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Нельзя удалить чужой фильм');
      }
      Movie.deleteOne()
        .then(() => res.status(OK).send({ message: 'Фильм удален.' }));
    })
    .catch(next);
};



module.exports = {
  deleteUserMovie,
  getUserMovies,
  createUserMovie,
};