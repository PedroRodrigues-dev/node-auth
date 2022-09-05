const i18n = require('../../../config/i18n/i18n')

exports.login = () => {
  return {
    $login: 'admin',
    $password: 'admin',
  }
}

exports.loginSuccess = () => {
  return {
    $auth: true,
    $token: 'token',
  }
}

exports.loginFailed = () => {
  return {
    $auth: false,
    $message: i18n.locale.invalidLogin,
  }
}
