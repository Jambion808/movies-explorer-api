const filmRouter = require('express').Router();
const { getFilms, createFilm, deleteFilm } = require('../controllets/movies');
const { filmValidation, deleteFilmValidation } = require('../middlewares/validators');

filmRouter.get('/', getFilms);
filmRouter.post('/', filmValidation, createFilm);
filmRouter.delete('/:_id', deleteFilmValidation, deleteFilm);

module.exports = filmRouter;
