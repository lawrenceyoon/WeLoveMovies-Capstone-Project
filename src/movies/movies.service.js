const knex = require('../db/connection');

// get matching movie where id is same
function read(movie_id) {
  return knex('movies').select().where({ 'movies.movie_id': movie_id }).first();
}

// .modify lets us do additional configuration; if isShowing param is true then run the queryBuilder
function list(isShowing) {
  return knex('movies as m')
    .select('m.*')
    .modify((queryBuilder) => {
      if (isShowing) {
        queryBuilder
          .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
          .where({ 'mt.is_showing': true })
          .groupBy('m.movie_id');
      }
    });
}

module.exports = {
  read,
  list,
};
