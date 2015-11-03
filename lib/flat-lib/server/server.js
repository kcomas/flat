
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _serverLoopJs = require('./serverLoop.js');

var _serverLoopJs2 = _interopRequireDefault(_serverLoopJs);

var _loadBody = require('./loadBody');

var _loadBody2 = _interopRequireDefault(_loadBody);

var _urlModsJs = require('./urlMods.js');

var _urlModsJs2 = _interopRequireDefault(_urlModsJs);

var _cookiesJs = require('./cookies.js');

var _cookiesJs2 = _interopRequireDefault(_cookiesJs);

var _responseModsJs = require('./responseMods.js');

var _responseModsJs2 = _interopRequireDefault(_responseModsJs);

/**
 * The main server that accepts uses and routers
 */

var server = (function () {

  /**
   * @construnctor
   */

  function server() {
    _classCallCheck(this, server);

    /**
     * The config varable
     * @type {object}
     */
    this.config = {};

    /**
     * The max post data size
     * @type {number}
     */
    this.config.maxPostSize = 1e6;

    /**
     * The array of the routers
     * @type {array}
     */
    this.routers = [];

    /**
     * The array of use functions format fn(req,res,next)
     * @type {array}
     */
    this.uses = [];

    /**
     * The end function if nothing is found
     * @type {function}
     */
    this.done = function () {};

    /**
     * The controller where all the managers are stored
     * @type {controller}
     */
    this._controller = {};
  }

  /**
   * Load a config file,loads syncrounusly
   * @param {string} filename - the filename to be loaded
   */

  _createClass(server, [{
    key: 'loadConfig',
    value: function loadConfig(filename) {
      try {
        var file = _fs2['default'].readFileSync(filename);
        var tmpConfig = JSON.parse(file);
        for (var key in tmpConfig) {
          this.config[key] = tmpConfig[key];
        }
      } catch (err) {
        throw err;
      }
    }

    /**
     * set the controller
     * @param {controller} controller - the manager controller
     */
  }, {
    key: 'setValue',

    /**
     * Set a value in the config var
     * @param {string} name - the name of the value
     * @param {*} value - the value to be set
     */
    value: function setValue(name, value) {
      this.config[name] = value;
    }

    /**
     * Get a value from the config var
     * @param {string} name - the name of the value
     * @return {*} the value of the config[name]
     */
  }, {
    key: 'getValue',
    value: function getValue(name) {
      return this.config[name];
    }

    /**
     * Add Routes to the routes array 
     * @param {string} path - the path of the router
     * @param {router} router - the router to be added
     */
  }, {
    key: 'route',
    value: function route(path, router) {
      this.routers.push({ path: path, router: router });
    }

    /**
     * Adds a funtion to the uses array
     * @param {function} fn - the function to be added to the uses array
     */
  }, {
    key: 'use',
    value: function use(fn) {
      this.uses.push(fn);
    }

    /**
     * Function to be run if no matching paths are found
     * @param {function} fn - the function to be added
     */
  }, {
    key: 'always',
    value: function always(fn) {
      this.done = fn;
    }

    /**
     * This function is passed into http/https runs the main server
     * @returns {function} the function to be passed to the http/s
     */
  }, {
    key: 'run',
    value: function run() {
      var _this = this;

      return function (req, res) {
        //load post data
        (0, _urlModsJs2['default'])(req);
        (0, _responseModsJs2['default'])(req, res, _this.getValue('port'));
        (0, _cookiesJs2['default'])(req, res);
        (0, _loadBody2['default'])(req, res, _this.config.maxPostSize, function () {
          var loop = new _serverLoopJs2['default'](req, res, _this.uses, _this.routers, _this.done);
          loop.loop();
        });
      };
    }
  }, {
    key: 'controller',
    set: function set(controller) {
      this._controller = controller;
    },

    /**
     * Get the manager controller
     * @return {controller} the manager controller
     */
    get: function get() {
      return this._controller;
    }
  }]);

  return server;
})();

exports['default'] = server;
module.exports = exports['default'];