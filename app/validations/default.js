const { message } = require('./models/default')

// Return sequelize validations
exports.sequelizeValidation = (req, res, err) => {
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors
    const errorList = errors.map((e) => {
      let obj = {}
      obj[e] = e.message
      return obj
    })
    return res.status(400).json(message(errorList))
  } else {
    res.status(500).json(message(err))
  }
}
