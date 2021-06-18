const path = require('path');

if (process.env.USER) require('dotenv').config();

const {
  // DATABASE_URL = "postgresql://postgres@localhost/postgres",
  DATABASE_URL = 'postgres://ribanbxe:loK5ic5r9f-hs66grOZdy0x1lqdFRtLU@kashin.db.elephantsql.com/ribanbxe',
} = process.env;

module.exports = {
  development: {
    client: 'postgresql',
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds'),
    },
  },

  production: {
    client: 'postgresql',
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds'),
    },
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds'),
    },
    useNullAsDefault: true,
  },
};
