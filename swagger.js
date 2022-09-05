const { loginSuccess, loginFailed, login } = require('./app/schemas/auth/login')
const { loggedOut, userLoggedOut } = require('./app/schemas/auth/logout')
const {
  register,
  registerUserAlreadyExists,
} = require('./app/schemas/auth/register')
const {
  unautorized,
  failedToAuthenticate,
  adminsOnly,
} = require('./app/schemas/default')

require('dotenv').config()

const swaggerAutogen = require('swagger-autogen')()

const port = process.env.PORT || 3000

// Documentation defaults
const doc = {
  info: {
    version: '1.0.0',
    title: 'AUTH',
    description: 'Express auth service with JWT and Redis',
    license: {
      name: 'MIT',
      url: 'https://mit-license.org',
    },
    contact: {
      name: 'Pedro Rodrigues',
      url: 'https://github.com/PedroRodrigues-dev',
      email: 'pedroras004@gmail.com',
    },
  },
  host: `localhost:${port}`,
  basePath: '/api/v1',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      in: 'header',
      name: 'x-access-token',
    },
  },
  definitions: {
    login: login(),
    loginSuccess: loginSuccess(),
    loginFailed: loginFailed(),
    unautorized: unautorized(),
    failedToAuthenticate: failedToAuthenticate(),
    loggedOut: loggedOut(),
    userLoggedOut: userLoggedOut(),
    adminsOnly: adminsOnly(),
    register: register(),
    registerUserAlreadyExists: registerUserAlreadyExists(),
  },
}

// Output
const outputFile = './swagger.json'

// System routes
const endpointsFiles = ['./config/router.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
