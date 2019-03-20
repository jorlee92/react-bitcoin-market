'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment_to = sequelize.define('comment_to', {
    content: DataTypes.TEXT
  }, {});
  comment_to.associate = function(models) {
    // associations can be defined here
    models.comment_to.hasOne(models.user, {as: 'author'})
    models.comment_to.hasOne(models.user, {as: 'profile'})

  };
  return comment_to;
}; 