'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addConstraint('UserMovies', ['UserId'], {
        type: 'foreign key',
        name: 'UserId_constraint',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
      });
  },

  down: (queryInterface, Sequelize) => {
    return removeConstraint('UserMovies', 'UserId_constraint', {})
  }
};
