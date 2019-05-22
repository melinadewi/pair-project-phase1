'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    year: DataTypes.INTEGER,
    imdb_score: DataTypes.INTEGER
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsToMany(models.User, { 
      through: models.UserMovie, 
      foreignKey: 'MovieId'
    })
  };
  return Movie;
};