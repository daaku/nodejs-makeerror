makeerror
=========

A library to make errors. Makes an Error constructor function with the
signature:

```javascript
function([[message,] data])
```

You'll typically do something like:

```javascript
var makeError = require('makeerror')
var UnknownFileTypeError = makeError(
  'UnknownFileTypeError',
  'The specified type is not known.'
)
var er = UnknownFileTypeError()
```

`er` will have a prototype chain that ensures:

```javascript
er instanceof Error
er instanceof UnknownFileTypeError
```

There is support for simple string substitutions like:
```javascript
var makeError = require('makeerror')
var UnknownFileTypeError = makeError(
  'UnknownFileTypeError',
  'The specified type "{type}" is not known.'
)
var er = UnknownFileTypeError({ type: 'bmp' })
```

Now
```javascript
er.message
```
or
```javascript
er.toString()
```
will return
```javascript
'The specified type "bmp" is not known.'
```
.
