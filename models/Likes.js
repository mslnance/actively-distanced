const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Likes extends Model {}

Likes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    activity_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'activity',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'like'
  }
);

module.exports = Likes;
