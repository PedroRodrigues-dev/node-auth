const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')
const { verifyJWT, isAdmin } = require('../validations/auth')

const login = async (req, res) => {
  /*  #swagger.parameters['parameter_name'] = {
        in: 'body',
        schema: { $ref: '#/definitions/login' }
    } */
  /* #swagger.responses[200] = {
      description: 'Success',
      schema: { $ref: '#/definitions/loginSuccess' }
  } */
  /* #swagger.responses[400] = {
      description: 'Login failed',
      schema: { $ref: '#/definitions/loginFailed' }
  } */
  controller.login(req, res)
}

const register = async (req, res) => {
  /* #swagger.security = [{
            "JWT": []
    }] */
  /* #swagger.parameters['parameter_name'] = {
        in: 'body',
        schema: { $ref: '#/definitions/register' }
    } */
  /* #swagger.responses[400] = {
      description: 'User Already Exists',
      schema: { $ref: '#/definitions/registerUserAlreadyExists' }
    } */
  /* #swagger.responses[401] = {
      description: 'Unautorized',
      schema: { $ref: '#/definitions/unautorized' }
    } */
  /* #swagger.responses[403] = {
        description: 'Only Admins',
        schema: { $ref: '#/definitions/adminsOnly' }
    } */
  /* #swagger.responses[500] = {
      description: 'Failed To Authenticate',
      schema: { $ref: '#/definitions/failedToAuthenticate' }
  } */
  controller.register(req, res)
}

const logout = async (req, res) => {
  /* #swagger.security = [{
            "JWT": []
    }] */
  /* #swagger.responses[200] = {
      description: 'Logged Out',
      schema: { $ref: '#/definitions/loggedOut' }
  } */
  /* #swagger.responses[401] = {
      description: 'Unautorized',
      schema: { $ref: '#/definitions/unautorized' }
  } */
  /* #swagger.responses[500] = {
      description: 'Failed To Authenticate',
      schema: { $ref: '#/definitions/failedToAuthenticate' }
  } */
  controller.logout(req, res)
}

router.post('/login', login)
router.post('/register', verifyJWT, isAdmin, register)
router.post('/logout', verifyJWT, logout)

module.exports = router
