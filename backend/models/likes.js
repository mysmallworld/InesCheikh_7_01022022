'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  })
  Likes.associate= (models) => {
    models.Likes.belongsTo(models.User,{
      foreignKey: { allowNull: false}, onDelete: 'CASCADE' 
    }),
    models.Likes.belongsTo(models.Post,{
      foreignKey: { allowNull: false}, onDelete: 'CASCADE' 
    });
  };

  return Likes;
};