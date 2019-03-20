'use strict';
module.exports = (sequelize, DataTypes) => {
  const holding = sequelize.define('holding', {
    quantity: DataTypes.FLOAT
  }, {});
  holding.associate = function(models) {
    // associations can be defined here
  };
  holding.associate = function(models) {
    // associations can be defined here
    models.holding.belongsTo(models.user)
    models.holding.belongsTo(models.currency)


  };
  return holding;
};

