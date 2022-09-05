const { TYPE } = require('../../enums/user')
const i18n = require('../../../config/i18n/i18n')

exports.register = () => {
  return {
    $login: 'teste',
    $password: '12345678',
    $type: TYPE.DEFAULT,
  }
}

exports.registerUserAlreadyExists = () => {
  return {
    $message: i18n.locale.userAlreadyExists,
  }
}
