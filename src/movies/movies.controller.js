const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// validation
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: `Product cannot be found.`,
  });
}

function read(req, res) {
  res.json({ data: res.locals.movie });
}

async function list(req, res, next) {
  const isShowing = req.query.is_showing;
  if (typeof isShowing === 'undefined') {
    const data = await service.list();
    res.json({ data });
  } else {
    const data = await service.moviesAreShowing();
    res.json({ data });
  }
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  list: asyncErrorBoundary(list),
};
