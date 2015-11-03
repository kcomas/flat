
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/**
 * Handel the loading and saving of files for users,sessions,pages,sections
 */

var fileManager = (function () {

    /**
     * @constructor
     * @param {string} dir - the directory of the files
     */

    function fileManager(dir) {
        _classCallCheck(this, fileManager);

        /**
         * The directory of the files
         * @type {string}
         */
        this.dir = dir;
    }

    /**
     * Save an object to the disk
     * @param {string} name - the name of the file
     * @param {object} obj - the object to be saved
     * @param {function(err:error,done:boolean)} callback - the callback function returns done or error if an error saving
     * @return {function} the callback function
     */

    _createClass(fileManager, [{
        key: 'save',
        value: function save(name, obj, callback) {
            var file = this.dir + name;
            try {
                obj = JSON.stringify(obj);
            } catch (err) {
                return callback(err, null);
            }
            _fs2['default'].writeFile(file, obj, 'utf8', function (err) {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, true);
            });
        }

        /**
         * Load an object from disk
         * @param {string} name - the name of the file
         * @param {function(err:error,obj:object)} callback - callback function shows if error or the object loaded
         * @return {function} the callback function
         */
    }, {
        key: 'load',
        value: function load(name, callback) {
            var file = this.dir + file;
            _fs2['default'].readFile(file, 'utf8', function (err, data) {
                if (err) {
                    return callback(err, null);
                }
                try {
                    var obj = JSON.parse(data);
                } catch (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, obj);
            });
        }

        /**
         * Remove an object from disk
         * @param {string} name - the name of the file
         * @param {function(err:error,done:boolean)} callback - the callback if the file was deleted or not
         * @return {function} the callback function
         */
    }, {
        key: 'unlink',
        value: function unlink(name, callback) {
            _fs2['default'].unlink(this.dir + name, function (err) {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, true);
            });
        }

        /**
         * Remove an object from disk syncronously
         * @param {string} name - the name of the file
         */
    }, {
        key: 'unlinkSync',
        value: function unlinkSync(name) {
            try {
                _fs2['default'].unlinkSync(this.dir + name);
            } catch (err) {
                console.log(err);
            }
        }
    }]);

    return fileManager;
})();

exports['default'] = fileManager;
module.exports = exports['default'];