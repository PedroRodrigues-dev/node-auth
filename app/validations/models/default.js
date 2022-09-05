const i18n = require('../../../config/i18n/i18n')

// Default message
exports.message = (message) => {
  return { message: message }
}

// Field null message
exports.nullMessage = (field) => {
  return `${field} ${i18n.locale.cannotNull}`
}

// Field empty message
exports.emptyMessage = (field) => {
  return `${field} ${i18n.locale.cannotEmpty}`
}
