'use strict';
module.exports = (sequelize, DataTypes) => {
  const trade = sequelize.define('trade', {
    quantity: DataTypes.FLOAT,
    pricepaid: DataTypes.FLOAT,
    mode: DataTypes.INTEGER
  }, {});
  trade.associate = function(models) {
    // associations can be defined here
    models.trade.belongsTo(models.user)
  };
  return trade;
};