'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {type:DataTypes.STRING,
    validate : {
      isEmail : {
        args : true,
        msg : 'email format must be true'
      }
    }},
    imageProfile: DataTypes.STRING
  }, {
    hooks :{
      beforeCreate : (user,options) =>{
        user.password = bcrypt.hashSync(user.password, salt);
        user.imageProfile = '/images/default.jpg'
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Photo, {foreignKey: 'userId'})
    User.belongsToMany(models.User,{ as: 'Teman',through: models.Friend, foreignKey : 'userId', otherKey: 'friendId'})
  };
  User.prototype.comparePass = function(password){
    return bcrypt.compareSync(password, this.password)
  }


  return User;
};