'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  })
  Comment.associate= (models) => {
        // associations can be defined here
        models.Comment.belongsTo(models.User, {
          foreignKey: {allowNull: false},
          onDelete: 'CASCADE'
        }),
          models.Comment.belongsTo(models.Post, {
            foreignKey: {allowNull: false},
            onDelete: 'CASCADE'
          });

      };
    
  return Comment;
};