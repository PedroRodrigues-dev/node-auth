const jwt = require('jsonwebtoken')
const i18n = require('../../config/i18n/i18n')
const { authenticationFailed } = require('./models/auth')
const { User } = require('../models')
const { TYPE } = require('../enums/user')
const redis = require('../../config/redis')
const { message } = require('./models/default')

// Validate JWT tokens
exports.verifyJWT = async (req, res, next) => {
  // #swagger.ignore = true
  const token = req.headers['x-access-token']
  if (!token)
    return res.status(401).json(authenticationFailed(i18n.locale.noToken))
  if ((await redis.get(token)) == 'false')
    return res.status(401).json(authenticationFailed(i18n.locale.userLoggedOut))
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res.status(500).json(authenticationFailed(i18n.locale.failedAuth))
    req.userId = decoded.id
    next()
  })
}

// Verify if is admin
exports.isAdmin = async (req, res, next) => {
  // #swagger.ignore = true
  const user = await User.findOne({
    where: { last_token: req.headers['x-access-token'] },
  })
  if (user.type == TYPE.ADMIN) {
    next()
  } else {
    return res.status(403).json(authenticationFailed(i18n.locale.noAdmin))
  }
}

// Validate password
exports.passwordValidation = (res, password) => {
  if (password === null || password === undefined) {
    res.status(400).json(message('Password ' + i18n.locale.cannotNull))
    return false
  } else if (password.length < 8) {
    res.status(400).json(message(i18n.locale.passwordLength))
    return false
  }
  return true
}
