'use strict';
module.exports = (sequelize, DataTypes) => {
  const currency = sequelize.define('currency', {
    name: DataTypes.TEXT
  }, {});
  currency.associate = function(models) {
    // associations can be defined here
    models.currency.hasMany(models.trade);
  };
  return currency;
};