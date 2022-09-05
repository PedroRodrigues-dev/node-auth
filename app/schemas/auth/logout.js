const i18n = require('../../../config/i18n/i18n')

exports.loggedOut = () => {
  return {
    $auth: false,
    $token: 'token',
  }
}

exports.userLoggedOut = () => {
  return {
    $auth: false,
    $message: i18n.locale.userLoggedOut,
  }
}
