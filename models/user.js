'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    hooks :{
      beforeCreate : (user,options) =>{
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.User, {as: 'user', through: models.Friend, foreignKey: 'friendId'})
  };
  return User;
};