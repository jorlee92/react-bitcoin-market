'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment_from = sequelize.define('comment_from', {
    content: DataTypes.TEXT
  }, {});
  comment_from.associate = function(models) {
    // associations can be defined here
  };
  return comment_from;
};