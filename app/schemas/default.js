const i18n = require('../../config/i18n/i18n')

exports.unautorized = () => {
  return {
    $auth: false,
    $message: i18n.locale.noToken,
  }
}

exports.failedToAuthenticate = () => {
  return {
    $auth: false,
    $message: i18n.locale.failedAuth,
  }
}

exports.adminsOnly = () => {
  return {
    $auth: false,
    $message: i18n.locale.noAdmin,
  }
}
