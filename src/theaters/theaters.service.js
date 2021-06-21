const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

const addMovies = mapProperties({});

function list() {
  return knex('theaters as t')
    .join('movies_theaters as mt', 'mt.theater_id', 't.theater_id')
    .join('movies as m', 'mt.movie_id', 'm.movie_id')
    .select();
}

module.exports = {
  list,
};
