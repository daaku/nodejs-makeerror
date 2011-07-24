var makeError = require('../index')
  , assert = require('assert')

exports['simple error'] = function(beforeExit) {
  var name = 'MyError'
    , MyError = makeError(name)
    , er = MyError()
  assert.ok(er, 'Get something back')
  assert.strictEqual(er.name, name, 'Expect name on instance')
  assert.ok(er instanceof Error, 'Must be an instance of Error')
  assert.ok(er instanceof MyError, 'Must be an instance of MyError')
}

exports['create with new'] = function(beforeExit) {
  var MyError = makeError('MyError')
    , er = new MyError()
  assert.ok(er, 'Get something back')
  assert.ok(er instanceof Error, 'Must be an instance of Error')
  assert.ok(er instanceof MyError, 'Must be an instance of MyError')
}

exports['check default values'] = function(beforeExit) {
  var MyError = makeError('MyError')
    , er = new MyError()
  assert.strictEqual(er.message, '', 'Default empty string message')
  assert.deepEqual(er.data, {}, 'Default empty data object')
}

exports['check custom values'] = function(beforeExit) {
  var message = 'abc'
    , data = { answer: 42 }
    , MyError = makeError('MyError')
    , er = new MyError(message, data)
  assert.strictEqual(er.message, message, 'Custom message')
  assert.deepEqual(er.data, data, 'Custom data object')
}

exports['check custom defaults'] = function(beforeExit) {
  var defaultMessage = 'abc'
    , defaultData = { answer: 42 }
    , MyError = makeError('MyError', defaultMessage, defaultData)
    , er = new MyError()
  assert.strictEqual(er.message, defaultMessage, 'Custom default message')
  assert.strictEqual(er.data, defaultData, 'Custom default data')
}

exports['check default values with custom default'] = function(beforeExit) {
  var defaultMessage = 'abc'
    , defaultData = { answer: 42 }
    , message = 'xyz'
    , data = { answer: 24 }
    , MyError = makeError('MyError', defaultMessage, defaultData)
    , er = new MyError(message, data)
  assert.strictEqual(er.message, message, 'Custom message')
  assert.deepEqual(er.data, data, 'Custom data object')
}

exports['different but the same'] = function(beforeExit) {
  var MyError1 = makeError('MyError')
    , MyError2 = makeError('MyError')
    , er1 = MyError1()
    , er2 = MyError2()
  assert.ok(er1 instanceof Error, 'Must be an instance of Error')
  assert.ok(er1 instanceof MyError1, 'Must be an instance of MyError1')
  assert.ok(!(er1 instanceof MyError2), 'Must not be an instance of MyError2')
  assert.ok(er2 instanceof Error, 'Must be an instance of Error')
  assert.ok(er2 instanceof MyError2, 'Must be an instance of MyError2')
  assert.ok(!(er2 instanceof MyError1), 'Must not be an instance of MyError1')
}
