require('dotenv').config({ silent: process.env.NODE_ENV === 'production' });
module.exports = {
    "development": {
      "username": process.env.DATABASE_USERNAME,
      "password": process.env.DATABASE_PASSWORD,
      "database": process.env.DATABASE_NAME,
      "host": process.env.DATABASE_URL,
      "dialect": "postgres"
    },
    "production": {
      "use_env_variable": "DATABASE_URL",
      "url": process.env.DATABASE_URL,
      "dialect": "postgres"
    }
}