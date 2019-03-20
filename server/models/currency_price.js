'use strict';
module.exports = (sequelize, DataTypes) => {
  const currency_price = sequelize.define('currency_price', {
    name: DataTypes.TEXT,
    price: DataTypes.FLOAT
  }, {});
  currency_price.associate = function(models) {
    // associations can be defined here
    models.currency.hasOne(models.currency);
  };
  return currency_price;
};