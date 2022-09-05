require('dotenv').config()
const https = require('https')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const router = require('./config/router')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')
const bodyParser = require('body-parser')
const i18n = require('./config/i18n/i18n')
const helmet = require('helmet')

const app = express()

// Security layer
app.use(helmet())

// Configure CORS
const corsOptions = {
  origin: process.env.RELIABLE_ORIGIN || '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

// Define JSON Body
app.use(bodyParser.json())

// Redirect
app.get('/', (req, res) => {
  res.redirect('/docs')
})

// Base routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/api/v1', router)

// Start http server
const port = process.env.PORT || 3000

try {
  https
    .createServer(
      {
        key: fs.readFileSync('./certificates/key.pem'),
        cert: fs.readFileSync('./certificates/cert.pem'),
      },
      app
    )
    .listen(port, () => {
      console.log(
        `${i18n.locale.serverAlertListening} https://localhost:${port}`
      )
    })
} catch (e) {
  console.log(`${i18n.locale.serverCantStrated} ${e}`)
}
