const { EOL } = require('os')
const chalk = require('chalk')

function logger (...args) {
  logger.log(...args)
}

logger.log = (level, origin) => {
  const logObj = { timestamp: new Date().toISOString(), level }

  const argType = Object.prototype.toString.call(origin).slice(8, -1)
  if (argType === 'String') {
    logObj.message = origin
  } else {
    if (argType !== 'Object') throw new TypeError(`Expected Object, got: ${argType}`)

    if (Object.prototype.hasOwnProperty.call(origin, 'message')) logObj.message = origin.message
    for (const name of Object.getOwnPropertyNames(origin)) {
      if (name !== 'message') logObj[name] = origin[name]
    }
  }

  if (process.stdout.isTTY) logger.tty(logObj)
  else process.stdout.write(JSON.stringify(logObj) + EOL)
}

logger.tty = (obj) => {
  const { timestamp, level, message, ...rest } = obj
  const coloredLevel = logger.ttyGetColoredLevel(level)

  const msgItems = []
  if (message !== undefined) msgItems.push(message)
  if (level === 'error' && rest.stack !== undefined) {
    msgItems.push(rest.stack)
    delete rest.stack
  }
  if (Object.keys(rest).length > 0) msgItems.push(JSON.stringify(rest))

  process.stdout.write(`${timestamp} ${coloredLevel}: ${msgItems.join(EOL)}${EOL}`)
}

logger.ttyGetColoredLevel = (level) => {
  switch (level) {
    case 'error': return chalk.red(level)
    case 'info': return chalk.green(level)
    default: return level
  }
}

logger.error = (obj) => logger('error', obj)
logger.info = (obj) => logger('info', obj)

logger.chalk = chalk

module.exports = logger
