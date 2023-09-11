const { celebrate, Joi } = require("celebrate");
const { REGEX } = require("../utils/regex");

const validationSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(30),
  }),
});

const validationUpdateInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
<<<<<<< HEAD
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(REGEX),
    trailerLink: Joi.string().pattern(REGEX).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(REGEX),
    movieId: Joi.number().required(),
=======
    duration:Joi.number().required(),
    year:Joi.string().required(),
    description:Joi.string().required(),
    image:Joi.string().required(),
    trailerLink:Joi.string().required(),
    nameRU:Joi.string().required(),
    nameEN:Joi.string().required(),
    thumbnail:Joi.string().required(),
    movieId:Joi.number().required(),
>>>>>>> 9685ea2656b2fb111f363d1dfbcf14501a96924d
  }),
});

const validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validationSignup,
  validationSignin,
  validationUpdateInfo,
  validationCreateMovie,
  validationDeleteMovie,
};
