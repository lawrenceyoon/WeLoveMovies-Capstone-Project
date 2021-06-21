const knex = require('../db/connection');

function read(movie_id) {
  return knex('movies').select().where({ 'movies.movie_id': movie_id }).first();
}

function list() {
  return knex('movies').select();
}

function moviesAreShowing(isShowing) {
  console.log(isShowing);
  // select distinct movies.* from movies
  // join movies_theaters on movies.movie_id = movies_theaters.movie_id
  // where movies_theaters.is_showing = true
  // order by movies.movie_id;
  return knex('movies as m')
    .select('m.*')
    .distinct()
    .join('movies_theaters as mv', 'm.movie_id', 'mv.movie_id')
    .where({ 'mv.is_showing': isShowing });
}

module.exports = {
  read,
  list,
  moviesAreShowing,
};
