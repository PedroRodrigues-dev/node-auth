// Authentication failed message
exports.authenticationFailed = (message) => {
  return { auth: false, message: message }
}

// Authentication success message
exports.authenticationSuccess = (message) => {
  return { auth: true, token: message }
}

// Logged Out message
exports.loggedOut = (message) => {
  return { auth: false, token: message }
}
