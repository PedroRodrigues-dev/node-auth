require('dotenv').config()
const { lang } = require(`./${
  process.env.LANGUAGE == undefined ? 'en-US' : process.env.LANGUAGE
}`)

exports.locale = lang
