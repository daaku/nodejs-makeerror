var makeError = require('makeerror')
  , assert = require('assert')

exports['simple error'] = function() {
  var name = 'MyError'
    , MyError = makeError(name)
    , er = MyError()
  assert(er, 'Get something back')
  assert.strictEqual(er.name, name, 'Expect name on instance')
  assert(er instanceof Error, 'Must be an instance of Error')
  assert(er instanceof MyError, 'Must be an instance of MyError')
}

exports['create with new'] = function() {
  var MyError = makeError('MyError')
    , er = new MyError()
  assert(er, 'Get something back')
  assert(er instanceof Error, 'Must be an instance of Error')
  assert(er instanceof MyError, 'Must be an instance of MyError')
}

exports['check default values'] = function() {
  var MyError = makeError('MyError')
    , er = new MyError()
  assert.strictEqual(er.message, '', 'Default empty string message')
  assert.deepEqual(er.data, {}, 'Default empty data object')
}

exports['check custom values'] = function() {
  var message = 'abc'
    , data = { answer: 42 }
    , MyError = makeError('MyError')
    , er = new MyError(message, data)
  assert.strictEqual(er.message, message, 'Custom message')
  assert.deepEqual(er.data, data, 'Custom data object')
}

exports['check custom defaults'] = function() {
  var defaultMessage = 'abc'
    , defaultData = { answer: 42 }
    , MyError = makeError('MyError', defaultMessage, defaultData)
    , er = new MyError()
  assert.strictEqual(er.message, defaultMessage, 'Custom default message')
  assert.strictEqual(er.data, defaultData, 'Custom default data')
}

exports['check default values with custom default'] = function() {
  var defaultMessage = 'abc'
    , defaultData = { answer: 42 }
    , message = 'xyz'
    , data = { answer: 24 }
    , MyError = makeError('MyError', defaultMessage, defaultData)
    , er = new MyError(message, data)
  assert.strictEqual(er.message, message, 'Custom message')
  assert.deepEqual(er.data, data, 'Custom data object')
}

exports['different but the same'] = function() {
  var MyError1 = makeError('MyError')
    , MyError2 = makeError('MyError')
    , er1 = MyError1()
    , er2 = MyError2()
  assert(er1 instanceof Error, 'Must be an instance of Error')
  assert(er1 instanceof MyError1, 'Must be an instance of MyError1')
  assert(!(er1 instanceof MyError2), 'Must not be an instance of MyError2')
  assert(er2 instanceof Error, 'Must be an instance of Error')
  assert(er2 instanceof MyError2, 'Must be an instance of MyError2')
  assert(!(er2 instanceof MyError1), 'Must not be an instance of MyError1')
}

exports['custom prototype'] = function() {
  var parentName = 'ParentError'
    , ParentError = makeError(parentName)
    , childName = 'ChildError'
    , ChildError = makeError(childName, '', { proto: ParentError() })
    , parentEr = ParentError()
    , childEr = ChildError()

  assert.strictEqual(parentEr.name, parentName, 'expect parentName')
  assert(parentEr instanceof ParentError, 'expect instanceof ParentError')
  assert(parentEr instanceof Error, 'expect instanceof Error')
  assert(!(parentEr instanceof ChildError), 'not an instanceof ChildError')

  assert.strictEqual(childEr.name, childName, 'expect childName')
  assert(childEr instanceof ChildError, 'expect instanceof ChildError')
  assert(childEr instanceof ParentError, 'expect instanceof ParentError')
  assert(childEr instanceof Error, 'expect instanceof Error')
}

exports['custom prototype two levels'] = function() {
  var GParentError = makeError('GParentError')
    , ParentError = makeError('ParentError', '', { proto: GParentError() })
    , childName = 'ChildError'
    , ChildError = makeError(childName, '', { proto: ParentError() })
    , childEr = ChildError()

  assert.strictEqual(childEr.name, childName, 'expect childName')
  assert(childEr instanceof ChildError, 'expect instanceof ChildError')
  assert(childEr instanceof ParentError, 'expect instanceof ParentError')
  assert(childEr instanceof GParentError, 'expect instanceof GParentError')
  assert(childEr instanceof Error, 'expect instanceof Error')
}

exports['default templated message'] = function() {
  var name = 'MyError'
    , MyError = makeError(name, 'The answer is {answer} not {wrong.answer}')
    , er = MyError({ answer: 42, wrong: { answer: 43 }})
  assert.strictEqual(er.message, 'The answer is 42 not 43')
}

exports['custom templated message'] = function() {
  var name = 'MyError'
    , MyError = makeError(name)
    , er = MyError('The answer is {answer}', { answer: 42 })
  assert.strictEqual(er.message, 'The answer is 42')
}

exports['custom templated message toString'] = function() {
  var name = 'MyError'
    , MyError = makeError(name)
    , er = MyError('The answer is {answer}', { answer: 42 })
  assert.strictEqual(er.toString(), 'The answer is 42')
}

exports['custom prototype toString'] = function() {
  var theMessage = 'Some message'
    , parentName = 'ParentError'
    , ParentError = makeError(parentName)
    , childName = 'ChildError'
    , ChildError = makeError(childName, theMessage, { proto: ParentError() })
    , parentEr = ParentError()
    , childEr = ChildError()

  assert.strictEqual(childEr.toString(), theMessage, 'expect message on child')
}

exports['proto must be created via makeError'] = function() {
  assert.throws(
    function() {
      makeError('Child', '', { proto: new Error() })
    },
    /created via makeError/
  )
}

exports['stack trace'] = function() {
  var name = 'MyError'
    , MyError = makeError(name)
    , er = MyError()
  assert(new RegExp(name + '\\n *at .*' + __filename).exec(er.stack))
}

exports['stack trace with message'] = function() {
  var name = 'MyError'
    , message = 'the message'
    , MyError = makeError(name, message)
    , er = MyError()
  assert(
    new RegExp(name + ': ' + message + '\\n *at .*' + __filename).exec(er.stack)
  )
}
