
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
 * This class collects information from various parts of the server
 */

var info = (function () {

  /**
   * Set the dir and file for storing the data on disk
   * @constructor
   * @param {string} dir - the dir to store the file
   * @param {string} filename - the json filename on disk
   * @param {number} writeInfoToDiskAfter - the number of updates to the data object before we write to disk
   */

  function info(dir, filename, writeInfoToDiskAfter) {
    _classCallCheck(this, info);

    /**
     * The info storage dir
     * @type {string}
     */
    this.dir = dir;

    //check that the dir exists if not create
    try {
      var stat = _fs2['default'].statSync(this.dir);
    } catch (err) {
      if (err.code === 'ENOENT') {
        _fs2['default'].mkdirSync(this.dir);
      } else {
        console.dir(err);
      }
    }

    /**
     * The info storage file
     * @type {string}
     */
    this.filename = filename;

    /**
     * The data collected
     * @type {object}
     */
    this._data = {};

    /**
     * The current page views key is the perm link
     * @type {object}
     */
    this._data.pageViews = {};

    /**
     * The last user who logged in name and date
     * @type {object}
     */
    this._data.lastLogin = {};

    //try to load the info file
    try {
      this._data = JSON.parse(_fs2['default'].readFileSync(this.dir + this.filename, 'utf8'));
    } catch (err) {}

    /**
     * The last boot time
     * @type {date}
     */
    this._data.boot = new Date();

    /**
     * The number of updates before we write to disk
     * @type {number}
     */
    this.writeInfoToDiskAfter = writeInfoToDiskAfter;

    /**
     * The current number of updates to the data object
     * @type {number}
     */
    this.currentUpdates = 0;
  }

  /**
   * Get the current data object as a string
   * @return {string} the data object as a json string
   */

  _createClass(info, [{
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this._data, null, 2);
    }

    /**
     * Write the data object to disk asyncronously
     * @param {function(err:error,done:boolean)} callback - done is true if the file was writen to disk
     * @return {function} the callback function
     */
  }, {
    key: 'write',
    value: function write(callback) {
      this.currentUpdates = 0;
      _fs2['default'].writeFile(this.dir + this.filename, this.toString(), 'utf8', function (err) {
        if (err) {
          return callback(err, null);
        }
        return callback(null, true);
      });
    }

    /**
     * Check if we need to write to disk
     */
  }, {
    key: 'checkWrite',
    value: function checkWrite() {
      this.currentUpdates++;
      if (this.currentUpdates >= this.writeInfoToDiskAfter) {
        //this is async but we are not looking if success or not
        this.write();
      }
    }

    /**
     * Get the data object
     * @return {object} the data object
     */
  }, {
    key: 'data',
    get: function get() {
      this.checkWrite();
      return this._data;
    },

    /**
     * Set the data object
     * @param {object} obj - the new data object
     */
    set: function set(obj) {
      this._data = obj;
    }
  }]);

  return info;
})();

exports['default'] = info;
module.exports = exports['default'];