const express = require('express')
const router = express.Router()
const auth = require('../app/routes/auth')
const user = require('../app/routes/user')
const { isAdmin, verifyJWT } = require('../app/validations/auth')

router.use(
  '/auth',
  auth
  // #swagger.tags = ['Auth']
)

router.use(
  '/users',
  verifyJWT,
  isAdmin,
  user
  // #swagger.tags = ['User']
  /* #swagger.security = [{
            "JWT": []
    }] */
)

module.exports = router
