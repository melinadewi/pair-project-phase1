'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Movies', 'imdb_score')
          .then(function () {
            return queryInterface.addColumn('Movies', 'director', Sequelize.STRING)
          })
          .then(function () {
            return queryInterface.addColumn('Movies', 'actor', Sequelize.STRING)
          })
          .then(function () {
            return queryInterface.addColumn('Movies', 'synopsis', Sequelize.STRING)
          })
          .then(function () {
            return queryInterface.addColumn('Movies', 'genre', Sequelize.STRING)
          })
          .catch(err => {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Movies', 'imdb_score', Sequelize.INTEGER)
        .then(function () {
          return queryInterface.removeColumn('Movies', 'director')
        })
        .then(function () {
          return queryInterface.removeColumn('Movies', 'actor')
        })
        .then(function () {
          return queryInterface.removeColumn('Movies', 'synopsis')
        })
        .then(function () {
          return queryInterface.removeColumn('Movies', 'genre')
        })
        .catch(err => {})
  }
};
