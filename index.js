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
 * @param String  The name of the error.
 * @param String  The default message string.
 * @param Object  The default data object, merged with per instance data.
 */
function makeError(name, defaultMessage, defaultData) {
  var CustomError = function(message, data) {
    if (!(this instanceof CustomError)) return new CustomError(message, data)
    this.name = name;
    this.message = message || defaultMessage || ''
    this.data = data || defaultData || {}
  }
  CustomError.prototype = new Error();
  return CustomError
}
