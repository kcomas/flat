"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _routerLoopJs = require('./routerLoop.js');

var _routerLoopJs2 = _interopRequireDefault(_routerLoopJs);

/**
 * The core of the server handels the use and get and post routes  
 */

var router = (function () {
  /** 
   * @constructor create the values for the router 
   */

  function router() {
    _classCallCheck(this, router);

    /**
     * the config object for the router stores key/vars
     */
    this.config = {};

    /**
     * this the the array of functions to run before the stack the function is fn(req,res,next)
     */
    this.uses = [];

    /**
     * this is the array of the gets as objects {path,fn(req,res)}
     */
    this.gets = [];

    /**
     * this is the array of the posts as objects{path,fn(req,res)}
     */
    this.posts = [];

    /**
     * The function to be run if no route is matched
     */
    this.doneFn = function () {};

    /**
     * The manager controller
     * @type {controller}
     */
    this._controller = {};
  }

  /**
   * set the controller
   * @param {controller} controller - the manager controller
   */

  _createClass(router, [{
    key: 'loadConfig',

    /**
     * Loads a config file and stores it overwrites whats in the current config var
     * Loads syncronuously
     * @param {string} filename - the file name
     */
    value: function loadConfig(filename) {
      try {
        var file = _fs2['default'].readFileSync(filename, 'utf8');
        this.config = JSON.parse(file);
      } catch (err) {
        console.log(err);
      }
    }

    /**
     * Writes the configuration to a file
     * @param {string} filename - the filename to write to
     */
  }, {
    key: 'writeConfig',
    value: function writeConfig(filename) {
      try {
        _fs2['default'].writeFileSync(filename, JSON.stringify(this.config), 'utf8');
      } catch (err) {
        console.log(err);
      }
    }

    /**
     * Gets a value form the config var
     * @param {string} name - the name of the config value we want to get
     * @return {*} retuns the value of the config
     */
  }, {
    key: 'getValue',
    value: function getValue(name) {
      return this.config[name];
    }

    /**
     * Sets a value in the config var
     * @param {string} name - the name of the value we want to set
     * @param {*} value - the value we want to set
     */
  }, {
    key: 'setValue',
    value: function setValue(name, value) {
      this.config[name] = value;
    }

    /**
     * This adds a function to the use array
     * @param {function} fn - the function to be added
     */
  }, {
    key: 'use',
    value: function use(fn) {
      this.uses.push(fn);
    }

    /**
     * Adds a function to the get array
     * @param {string} path - the path of the get
     * @param {function} fn - the function to add
     */
  }, {
    key: 'get',
    value: function get(path, fn) {
      this.gets.push({ path: path, fn: fn });
    }

    /**
     * Adds a function to the post array
     * @param {string} path - the path of the post array
     * @param {function} fn - the function to add
     */
  }, {
    key: 'post',
    value: function post(path, fn) {
      this.posts.push({ path: path, fn: fn });
    }

    /**
     * The function to be called if nothing is matched and the loop is not stoped
     * @param {function} fn - the final function
     */
  }, {
    key: 'always',
    value: function always(fn) {
      this.doneFn = fn;
    }

    /**
     * The function to loop through the routes, should export the class with this method
     * @return {function} returns a function to the server it was added to
     */
  }, {
    key: 'run',
    value: function run(control) {
      var _this = this;

      this._controller = control;
      return function (req, res) {
        var loop = new _routerLoopJs2['default'](req, res, _this.uses, _this.gets, _this.posts, _this.doneFn);
        loop.loop();
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

  return router;
})();

exports['default'] = router;
module.exports = exports['default'];