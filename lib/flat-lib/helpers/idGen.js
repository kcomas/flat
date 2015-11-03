
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = idGen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

/**
 * Generate a random id used by users and sessions
 * @param {function(err:err,id:string)} callback - the function which returns the id or error if there was an issue with crypto
 * @return {function} the callback function
 */

function idGen(callback) {
    _crypto2['default'].randomBytes(5, function (err, bytes) {
        if (err) {
            return callback(err, null);
        }
        var id = _crypto2['default'].createHash('sha512');
        id.update(bytes.toString(), 'utf8');
        id.update(new Date().getTime().toString(), 'utf8');
        return callback(null, id.digest('hex'));
    });
}

module.exports = exports['default'];