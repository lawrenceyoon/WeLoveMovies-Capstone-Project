const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

const addCategory = mapProperties({
  critic_id: 'critic.critic_id',
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',
  created_at: 'critic.created_at',
  updated_at: 'critic.updated_at',
});

function read(review_id) {
  return knex('reviews as r').select('*').where({ review_id }).first();
}

// need help
function update(updatedReview) {
  return knex('reviews as r')
    .join('critics as c', 'c.critic_id', 'r.critic_id')
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, [
      'r.review_id',
      'r.content',
      'r.score',
      'r.created_at',
      'r.updated_at',
      'r.critic_id',
      'r.movie_id',
    ])
    .then((createdRecord) => createdRecord[0]);
  // .then(addCategory);
}

function destroy(review_id) {
  return knex('reviews').where({ review_id }).del();
}

module.exports = {
  read,
  update,
  delete: destroy,
};
