# json2stdout

[![NPM Package](https://img.shields.io/npm/v/json2stdout.svg?style=flat-square)](https://www.npmjs.org/package/json2stdout) [![Build Status](https://img.shields.io/travis/fanatid/json2stdout.svg?branch=master&style=flat-square)](https://travis-ci.org/fanatid/json2stdout)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

This is simple logger for JavaScript programs.

- Support only 2 levels: `info` & `error` because nobody in reality do not care about other levels.
- All logs going to stdout, because apps is not a place where logs should be processed.
- Output in JSON, because it's really easy to parse.
- Fields in JSON object in order: `timestamp`, `level`, `message`, ...rest

## Usage

```js
const logger = require('json2stdout')

logger.info('hello')

const err = new Error('world')
logger.error({ message: err.message, stack: err.stack })
```

Output:
```
{"timestamp":"2018-09-27T07:41:16.194Z","level":"info","message":"hello"}
{"timestamp":"2018-09-27T07:41:16.309Z","level":"error","message":"world","stack":"Error: world\n    at repl:1:13\n    at Script.runInThisContext (vm.js:96:20)\n    at REPLServer.defaultEval (repl.js:329:29)\n    at bound (domain.js:396:14)\n    at REPLServer.runBound [as eval] (domain.js:409:12)\n    at REPLServer.onLine (repl.js:627:10)\n    at REPLServer.emit (events.js:187:15)\n    at REPLServer.EventEmitter.emit (domain.js:442:20)\n    at REPLServer.Interface._onLine (readline.js:290:10)\n    at REPLServer.Interface._line (readline.js:638:8)"}
```

## LICENSE

This library is free and open-source software released under the MIT license.
