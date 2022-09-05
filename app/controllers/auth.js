const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const i18n = require('../../config/i18n/i18n')
const {
  authenticationFailed,
  authenticationSuccess,
  loggedOut,
} = require('../validations/models/auth')
const { message } = require('../validations/models/default')
const { User } = require('../models')
const redis = require('../../config/redis')
const defaultValidation = require('../validations/default')
const { passwordValidation } = require('../validations/auth')

// 86400 Seconds == 24 Hours
exports.login = async (req, res) => {
  const login = req.body.login
  if (login != undefined) {
    const user = await User.findOne({ where: { login: login } })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const id = user.id
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 86400,
      })
      User.update({ last_token: token }, { where: { id: id } })
      if (user.last_token != null) {
        redis.set(user.last_token, false, 86400)
      }
      redis.set(token, true, 86400)
      return res.json(authenticationSuccess(token))
    }
  }
  res.status(400).json(authenticationFailed(i18n.locale.invalidLogin))
}

exports.register = async (req, res) => {
  try {
    const password = req.body.password
    if (passwordValidation(res, password)) {
      req.body.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      const [user, created] = await User.findOrCreate({
        where: { login: req.body.login },
        defaults: req.body,
      })
      if (created) {
        res.json(message('OK'))
      } else {
        res.status(400).json(message(i18n.locale.userAlreadyExists))
      }
    }
  } catch (err) {
    defaultValidation.sequelizeValidation(req, res, err)
  }
}

exports.logout = async (req, res) => {
  const token = req.headers['x-access-token']
  redis.set(token, false, 86400)
  res.json(loggedOut(token))
}
