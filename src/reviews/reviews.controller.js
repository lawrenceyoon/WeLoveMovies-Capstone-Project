const service = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: `Review cannot be found.`,
  });
}

// need help
async function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await service.update(updatedReview);

  res.json({ data });
}

async function destroy(req, res, next) {
  const data = await service.delete(res.locals.review.review_id);

  res.status(204).json({ data });
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
