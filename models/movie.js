'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    year: DataTypes.INTEGER,
    director: DataTypes.STRING,
    actor: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    genre: DataTypes.STRING
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