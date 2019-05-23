'use strict';
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {});

  User.addHook('beforeCreate', (user, options) => {
    if(user.password === ""){
      user.password = user.name + "movie"
    }
    let salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt)
  });

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Movie, { 
      through: models.UserMovie, 
      foreignKey: 'UserId'
    })
  };
  return User;
};