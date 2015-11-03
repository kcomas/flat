
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
 * This class manages the config for the entrie site
 */

var config = (function () {

  /**
   * Load the config class
   * @constructor
   * @param {string} filename - the config file
   */

  function config(filename) {
    _classCallCheck(this, config);

    /**
     * The filename
     * @type {string}
     */
    this.filename = filename;

    /**
     * The config object
     * @type {object}
     */
    this._config = JSON.parse(_fs2['default'].readFileSync(filename, 'utf8'));
  }

  /**
   * Get a config value
   * @param {string} key - the key for the config value
   * @return {object|array|date|number|boolean|null} - the value for the config key
   */

  _createClass(config, [{
    key: 'getValue',
    value: function getValue(key) {
      return this._config[key];
    }

    /**
     * Set a value and syncronusly write to disk should'nt be done often
     * @param {string} key - the name of the value to set
     * @param {object|array|date|number|boolean|null} value - the value to set
     */
  }, {
    key: 'setValue',
    value: function setValue(key, value) {
      this._config[key] = value;
      _fs2['default'].writeFileSync(this.filename, JSON.stringify(this._config, null, 2), 'utf8');
    }
  }]);

  return config;
})();

exports['default'] = config;
module.exports = exports['default'];