const { message } = require('../validations/models/default')
const { User } = require('../models')
const i18n = require('../../config/i18n/i18n')
const defaultValidation = require('../validations/default')

exports.findAll = async (req, res) => {
  const users = await User.findAll()
  res.json(users)
}

exports.findOne = async (req, res) => {
  const user = await User.findByPk(req.params.id)
  res.json(user)
}

exports.update = async (req, res) => {
  try {
    await User.update(req.body, {
      where: { id: req.params.id },
    })
    res.json(message('OK'))
  } catch (err) {
    defaultValidation.sequelizeValidation(req, res, err)
  }
}

exports.remove = async (req, res) => {
  const numberUsers = await User.destroy({
    where: {
      id: req.params.id,
    },
  })
  if (numberUsers > 0) res.sendStatus(204)
  res.status(202).json(message(i18n.locale.userNotFound))
}
