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

moviesRouter.delete("/movies/:movieId", validationDeleteMovie, deleteUserMovie);

module.exports = moviesRouter;
