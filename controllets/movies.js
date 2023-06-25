const Movie = require('../models/movie');
const NotFoundError = require('../errors/error-notFound');
const ForbiddenError = require('../errors/error-forbidden');

module.exports.getFilms = (req, res, next) => {
  Movie.find({ })
    .then((movies) => {
      res
        .status(200)
        .send(movies);
    })
    .catch((err) => next(err));
};

module.exports.createFilm = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res
        .status(201)
        .send(movie);
    })
    .catch((err) => next(err));
};

module.exports.deleteFilm = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError(
        'Фильм не найден',
      );
    })
    .then((movie) => {
      if (`${movie.owner}` !== req.user._id) {
        throw new ForbiddenError(
          'У вас нет прав для удаленя фильма',
        );
      }
      Movie.findByIdAndRemove(req.params._id)
        .orFail(() => {
          throw new NotFoundError(
            'Фильм не найден',
          );
        })
        .then(() => {
          res.send({ message: 'Фильм удален' });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};