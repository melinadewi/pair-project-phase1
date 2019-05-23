'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addConstraint('UserMovies', ['MovieId'], {
        type: 'foreign key',
        name: 'MovieId_constraint',
        references: {
          table: 'Movies',
          field: 'id'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('UserMovies', 'MovieId_constraint', {})
  }
};
