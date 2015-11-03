
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = tail;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var exec = _child_process2['default'].exec;

/**
 * This file uses child process to tail files
 * @param {string} file - the file to tail
 * @param {number} lines - the number of lines to tail
 * @param {function(err:error,file:string)} callback - returns the tailed file
 * @return {function} the callback function
 */

function tail(file, lines, callback) {
    var cmd = 'tail -n ' + lines + ' ' + file;
    exec(cmd, function (error, stdout, stderr) {
        if (error) {
            return callback(stderr, null);
        }
        return callback(null, stdout);
    });
}

module.exports = exports['default'];