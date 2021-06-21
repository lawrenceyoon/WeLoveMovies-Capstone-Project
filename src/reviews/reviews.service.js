const knex = require('../db/connection');

function read(review_id) {
  return knex('reviews').select('*').where({ review_id }).first();
}

function update(updatedReview) {
  return knex('reviews')
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, '*')
    .then((createdRecord) => createdRecord[0]);
}

module.exports = {
  read,
  update,
};
