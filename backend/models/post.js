'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Post must have a title' },
        notEmpty: { msg: 'Title must not be empty' }
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Post must have a content' },
        notEmpty: { msg: 'Content must not be empty' },
      },
    },
    imageURL: {
      type: DataTypes.STRING,
    },
    userId: DataTypes.INTEGER,
  })

  Post.associate = (models) => {
    // associations can be defined here

    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      }, onDelete: 'CASCADE'
    });

    models.Post.hasMany(models.Comment, { onDelete: 'CASCADE'});
    models.Post.hasMany(models.Likes, { onDelete: 'CASCADE'});
    models.Post.hasMany(models.Dislikes, { onDelete: 'CASCADE'});
  };

  return Post;
}