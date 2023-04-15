'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todo.hasMany(models.activity,{
        foreignKey: "id",
        onDelete: "cascade",
        onUpdate: "cascade",
      })
    }
  }
  todo.init({
    activity_group_id:{ 
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "activity_group_id is required",
        },
        notNull: {
          msg: "activity_group_id is required",
        },
      },
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "title is required",
        },
        notNull: {
          msg: "title is required",
        },
      },
    },
    priority: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "priority is required",
        },
        notNull: {
          msg: "priority is required",
        },
      },
    },
    is_active:{ 
      type:DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "is_active is required",
        },
        notNull: {
          msg: "is_active is required",
        },
      },
    }
  }, {
    sequelize,
    modelName: 'todo',
  });
  return todo;
};