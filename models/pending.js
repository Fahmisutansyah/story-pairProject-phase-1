'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pending = sequelize.define('Pending', {
    adderId: DataTypes.INTEGER,
    waitingId: DataTypes.INTEGER
  }, {});
  Pending.associate = function(models) {
    // associations can be defined here
  };
  return Pending;
};