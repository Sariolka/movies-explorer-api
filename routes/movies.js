const moviesRouter = require("express").Router();
const {
  validationCreateMovie,
  validationDeleteMovie,
} = require("../middlewares/validation");

const {
  getUserMovies,
  createUserMovie,
  deleteUserMovie,
} = require("../controllers/movies");

moviesRouter.get("/movies", getUserMovies);
moviesRouter.post("/movies", validationCreateMovie, createUserMovie);

<<<<<<< HEAD
moviesRouter.delete("/movies/:movieId", validationDeleteMovie, deleteUserMovie);
=======
moviesRouter.delete('/movies/:movieId', validationDeleteMovie, deleteUserMovie);
>>>>>>> 9685ea2656b2fb111f363d1dfbcf14501a96924d

module.exports = moviesRouter;
