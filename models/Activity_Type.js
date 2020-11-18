const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Activity_Type extends Model {}

Activity_Type.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
   
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'activity_type'
  }
);

module.exports = Activity_Type;
