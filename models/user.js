'use strict';
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        uniqueUsername(username, callback){
          User.findOne({
            where: {
              username: username
            }
          })
            .then(function (user){
              if(user){
                return callback('Username already in use')
              }
              return callback()
            })
            .catch(function (err){
              return callback(err)
            })
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        uniqueEmail(email, callback){
          User.findOne({
            where: {
              email: email
            }
          })
            .then(function (user){
              if(user){
                return callback('Email already in use')
              }
              return callback()
            })
            .catch(function (err){
              return callback(err)
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/i,
          msg: 'Password minimum five characters, at least one letter and one number:'
        }
      }
    },
    gender: DataTypes.STRING
  }, {});

  User.addHook('beforeCreate', (user, options) => {
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