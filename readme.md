makeerror
=========

A library to make errors. Makes an Error constructor function with the signature:

  function(message, data)

You'll typically do something like:

  var makeError = require('makeerror')
  var UnknownFileTypeError = makeError(
    'UnknownFileTypeError',
    'The specified type is not known.'
  )
  var er = UnknownFileTypeError()

`er` will have a prototype chain that ensures:

  er instanceof Error
  er instanceof UnknownFileTypeError

You can also do `var er = new UnknownFileTypeError()` if you really like the
`new` keyword.
