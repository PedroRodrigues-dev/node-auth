const redis = require('redis')

// Connect to redis
const connect = async () => {
  const redisClient = redis.createClient()
  redisClient.on('error', (error) => console.error(`Error : ${error}`))
  await redisClient.connect()
  return redisClient
}

// Set key value
exports.set = async (key, body, seconds) => {
  const redisClient = await connect()
  await redisClient.set(key.toString(), body.toString())
  if (seconds > 0)
    await redisClient.sendCommand([
      'EXPIRE',
      key.toString(),
      seconds.toString(),
    ])
}

// Get key value
exports.get = async (key) => {
  const redisClient = await connect()
  return await redisClient.get(key)
}
