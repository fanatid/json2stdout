const { EOL } = require('os')

function logger (level, origin) {
  const logObj = { timestamp: new Date().toISOString(), level }

  const argType = typeof origin
  if (argType === 'string') {
    logObj.message = origin
  } else {
    if (argType !== 'object') throw new TypeError(`Expected Object, got: ${argType}`)

    if (origin.hasOwnProperty('message')) logObj.message = origin.message
    for (const name of Object.getOwnPropertyNames(origin)) {
      if (name !== 'message') logObj[name] = origin[name]
    }
  }

  process.stdout.write(JSON.stringify(logObj) + EOL)
}

logger.info = (obj) => logger('info', obj)
logger.error = (obj) => logger('error', obj)

module.exports = logger
