const knex = require('../db/connection');

// added for /movies/:movieId/reviews
async function list(movie_id) {
  return knex('reviews')
    .where({ movie_id })
    .then((reviews) => Promise.all(reviews.map(setCritics)));
}

// gets info from matching review
async function read(reviewId) {
  return knex('reviews').where({ review_id: reviewId }).first();
}

// get critics object info
function getCritic(critic_id) {
  return knex('critics').select('*').where({ critic_id }).first();
}

// used on function list and update
async function setCritics(review) {
  review.critic = await getCritic(review.critic_id);
  return review;
}

// updates a matching review
async function update(review) {
  return knex('reviews')
    .where({ review_id: review.review_id })
    .update(review, '*')
    .then(() => read(review.review_id))
    .then(setCritics);
}

// deletes matching review id from db
function destroy(review_id) {
  return knex('reviews').where({ review_id }).del();
}

module.exports = {
  list,
  read,
  update,
  delete: destroy,
};
