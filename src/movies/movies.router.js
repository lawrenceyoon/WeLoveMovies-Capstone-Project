const router = require('express').Router();
const controller = require('./movies.controller');
const reviewsRouter = require('../reviews/reviews.router');
const theatersRouter = require('../theaters/theaters.router');
const methodNotAllowed = require('../errors/methodNotAllowed');

// working on returning theaters for specific movie
router.use('/:movieId/reviews', reviewsRouter);

router.use('/:movieId/theaters', theatersRouter);

router.route('/:movieId').get(controller.read).all(methodNotAllowed);

router.route('/').get(controller.list).all(methodNotAllowed);

module.exports = router;
