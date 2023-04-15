'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      activity.belongsTo(models.todo,{
        foreignKey: "id",
        onDelete: "cascade",
        onUpdate: "cascade",
      })
    }
  }
  activity.init({
    title: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "title cannot be null",
        },
        notNull: {
          msg: "title cannot be null",
        },
      },
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "email cannot be null",
        },
        notNull: {
          msg: "email cannot be null",
        },
        isEmail: {
          msg: "email is format",
        }
      },
    }
  }, {
    sequelize,
    modelName: 'activity',
  });
  return activity;
};