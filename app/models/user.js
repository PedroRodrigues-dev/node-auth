'use strict'
const { Model } = require('sequelize')
const { TYPE } = require('../enums/user')
const { emptyMessage, nullMessage } = require('../validations/models/default')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: nullMessage('login') },
          notEmpty: { msg: emptyMessage('login') },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: nullMessage('password') },
          notEmpty: { msg: emptyMessage('password') },
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      type: {
        type: DataTypes.ENUM(TYPE.ADMIN, TYPE.STORE, TYPE.DEFAULT),
        defaultValue: TYPE.DEFAULT,
      },
      last_token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
