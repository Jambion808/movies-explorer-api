const router = require('express').Router();
const userRouter = require('./users');
const filmRouter = require('./movies');
const errorRouter = require('./error');

router.use('/users', userRouter);
router.use('/movies', filmRouter);
router.use('/*', errorRouter);

module.exports = router;
