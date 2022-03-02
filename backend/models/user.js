'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post);
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name' },
        notEmpty: { msg: 'Name must not be empty' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
  },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    })
  return User
}