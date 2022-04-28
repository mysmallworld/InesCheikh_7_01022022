'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Dislikes = sequelize.define('Dislikes', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  })
  Dislikes.associate= (models) => {
    models.Dislikes.belongsTo(models.User,{
      foreignKey: { allowNull: false}, onDelete: 'CASCADE' 
    }),
    models.Dislikes.belongsTo(models.Post,{
      foreignKey: { allowNull: false}, onDelete: 'CASCADE' 
    });
  };

  return Dislikes;
};