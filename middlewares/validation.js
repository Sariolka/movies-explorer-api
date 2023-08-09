const { celebrate, Joi } = require('celebrate');

const validationSignup =  celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validationSignin =  celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(30),
  }),
});

const validationUpdateInfo =  celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validationCreateMovie =  celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration:Joi.number().required(),
    year:Joi.string().required(),
    description:Joi.string().required(),
    image:Joi.string().required(),
    trailer:Joi.string().required(),
    nameRU:Joi.string().required(),
    nameEN:Joi.string().required(),
    thumbnail:Joi.string().required(),
    movieId:Joi.number().required(),
  }),
});

const validationDeleteMovie =  celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validationSignup,
  validationSignin,
  validationUpdateInfo,
  validationCreateMovie,
  validationDeleteMovie,
};
