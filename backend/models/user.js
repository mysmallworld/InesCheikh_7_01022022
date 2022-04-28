'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a firstname' },
        notEmpty: { msg: 'Firstname must not be empty' },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'User must have a lastname' },
        notEmpty: { msg: 'Lastname must not be empty' },
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a email' },
        notEmpty: { msg: 'email must not be empty' },
        //isEmail: true
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a password' },
        notEmpty: { msg: 'password must not be empty' },
        //isPassword: true,
        set(value) {
          if (value.length >= 8 && value.length <= 100) {
            this.setDataValue('password', value);
          } else {
            throw new Error('Your password should be between 8-20 characters!');
          }
        }
      },
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },

  })
  User.associate = (models) => {
    // associations can be defined here
    models.User.hasMany(models.Post);
    models.User.hasMany(models.Comment);
    models.User.hasMany(models.Likes);
    models.Post.hasMany(models.Dislikes);

  };

  return User;
}