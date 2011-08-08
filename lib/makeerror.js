var tmpl = require('tmpl')

module.exports = makeError

/**
 * Makes an Error function with the signature:
 *
 *   function(message, data)
 *
 * You'll typically do something like:
 *
 *   var UnknownFileTypeError = makeError(
 *     'UnknownFileTypeError',
 *     'The specified type is not known.'
 *   )
 *   var er = UnknownFileTypeError()
 *
 * `er` will have a prototype chain that ensures:
 *
 *   er instanceof Error
 *   er instanceof UnknownFileTypeError
 *
 * You can also do `var er = new UnknownFileTypeError()` if you really like the
 * `new` keyword.
 *
 * @param String  The name of the error.
 * @param String  The default message string.
 * @param Object  The default data object, merged with per instance data.
 */
function makeError(name, defaultMessage, defaultData) {
  defaultMessage = tmpl(defaultMessage || '')
  defaultData = defaultData || {}

  var CustomError = function(message, data) {
    if (!(this instanceof CustomError)) return new CustomError(message, data)

    if (typeof message !== 'string' && !data) {
      data = message
      message = null
    }

    this.name = name
    this.data = data || defaultData

    if (typeof message === 'string') {
      this.message = tmpl(message, this.data)
    } else {
      this.message = defaultMessage(this.data)
    }
  }

  CustomError.prototype = defaultData.proto || new Error()
  delete defaultData.proto

  return CustomError
}
