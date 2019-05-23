'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserMovie = sequelize.define('UserMovie', {
    UserId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {});
  UserMovie.associate = function(models) {
    // associations can be defined here
  };
  return UserMovie;
};