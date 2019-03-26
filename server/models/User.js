
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
          type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dollars: {
            type: DataTypes.DOUBLE,
            defaultValue: 10000
        }
      });
      user.associate = function(models) {
        // associations can be defined here
        models.user.hasMany(models.trade)
        models.user.hasMany(models.holding)
      };
      return user;
    }