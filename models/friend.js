'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (user,options)=>{
        user.status = 0
      }
    }
  });
  Friend.associate = function(models) {
    // associations can be defined here
  };
  return Friend;
};