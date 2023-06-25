const { celebrate, Joi } = require('celebrate');

const regExpLink = /(https?:\/\/)(www.)?\w+[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=,]*/;

module.exports.singInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.singUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.filmValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExpLink),
    trailerLink: Joi.string().required().pattern(regExpLink),
    thumbnail: Joi.string().required().pattern(regExpLink),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteFilmValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports.updateProfileValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});