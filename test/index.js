const test = require('tape')
const { EOL } = require('os')
const logger = require('../')

test('json2stdout', (t) => {
  const stdoutWrite = process.stdout.write
  const wrap = (fn) => (t) => {
    let output = ''
    process.stdout.write = (t) => { output += t }
    try {
      fn(t, () => {
        process.stdout.write = stdoutWrite
        return output
      })
    } finally {
      process.stdout.write = stdoutWrite
    }
  }

  t.test('?', wrap((t, getOutput) => {
    logger.info('hello')
    logger('error', { x: 42, message: 'world' })

    const items = getOutput().split(EOL)
    t.equal(items.length, 3)
    t.equal(items[2], '')

    const obj1 = JSON.parse(items[0])
    t.same(obj1, { timestamp: obj1.timestamp, level: 'info', message: 'hello' })

    const obj2 = JSON.parse(items[1])
    t.same(obj2, { timestamp: obj2.timestamp, level: 'error', message: 'world', x: 42 })

    t.end()
  }))

  t.end()
})
