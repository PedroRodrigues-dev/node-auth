const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')

const findAll = (req, res) => {
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
  controller.findAll(req, res)
}

const findOne = (req, res) => {
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
  controller.findOne(req, res)
}

const update = (req, res) => {
  /* #swagger.parameters['parameter_name'] = {
        in: 'body',
        schema: {
            $login: '',
            "active": '',
            $type: ''
        }
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
  controller.update(req, res)
}

const remove = (req, res) => {
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
  controller.remove(req, res)
}

router.get('/', findAll)
router.get('/:id', findOne)
router.put('/:id', update)
router.delete('/:id', remove)

module.exports = router
