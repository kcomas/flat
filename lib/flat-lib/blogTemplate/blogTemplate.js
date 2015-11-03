
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
 * Class that stores info on the current blog list template
 */

var blogTemplate = (function () {

  /**
   * @constructor
   * @param {string} dir - the directory for the json file
   * @param {string} file - the file to write to
   */

  function blogTemplate(dir, file) {
    _classCallCheck(this, blogTemplate);

    /**
     * The file directory
     * @type {string}
     */
    this._dir = dir;

    //check that the dir exitsts
    try {
      var stat = _fs2['default'].statSync(this._dir);
    } catch (err) {
      if (err.code === 'ENOENT') {
        _fs2['default'].mkdirSync(this._dir);
      } else {
        console.dir(err);
      }
    }

    /**
     * The file to save to
     * @type {string}
     */
    this._file = file;

    /**
     * The data object
     * @type {object}
     */
    this._data = {};

    /**
     * The current blog template
     * @type {string}
     */
    this._data.template = '';

    /**
     * The number of blogs per list page
     * @type {number}
     */
    this._data.numPerPage = 10;

    /**
     * The cache page to use for rendering
     * @type {string}
     */
    this._data.cache = '';

    /**
     * The inernal string where the blog html is held
     * @type {string}
     */
    this._data.blogHtml = '';

    /**
     * The blog list internal html
     * @type {string}
     */
    this._data.blogListHtml = '';

    //try to read a file if it is on disk
    try {
      this._data = JSON.parse(_fs2['default'].readFileSync(this._dir + this._file, 'utf8'));
    } catch (err) {}
  }

  /**
   * Save the file to disk
   */

  _createClass(blogTemplate, [{
    key: 'save',
    value: function save() {
      _fs2['default'].writeFileSync(this._dir + this._file, JSON.stringify(this._data), 'utf8');
    }

    /**
     * Convert the data to a json string
     * @return {string} the json string of the data object
     */
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this._data, null, 2);
    }

    /**
     * Set the currents number of blogs per page
     * @param {number} num - the new number of blogs per page
     */
  }, {
    key: 'numPerPage',
    set: function set(num) {
      this._data.numPerPage = num;
    },

    /**
     * Get the number of blogs per page
     * @return {number} the number of blogs per page
     */
    get: function get() {
      return this._data.numPerPage;
    }

    /**
     * Set the current blog cache file
     * @param {string} str - the string of the blog cache
     */
  }, {
    key: 'cache',
    set: function set(str) {
      this._data.cache = str;
      //get the blog substring
      var start = this._data.cache.indexOf('<$$blog$$>');
      var end = this._data.cache.indexOf('</$$blog$$>') + '</$$blog$$>'.length;

      if (start !== -1 && end !== -1) {
        this._data.blogHtml = this._data.cache.substring(start, end);
        this._data.cache = this._data.cache.replace(this._data.blogHtml, '<BLOGDATA/>');
        this._data.blogHtml = this._data.blogHtml.replace('<\$\$blog\$\$>', '').replace('</\$\$blog\$\$>', '');
      }

      start = this._data.cache.indexOf('<$$blogList$$>');
      end = this._data.cache.indexOf('</$$blogList$$>') + '</$$blogList$$>'.length;
      if (start !== -1 && end !== -1) {
        this._data.blogListHtml = this._data.cache.substring(start, end);
        this._data.cache = this._data.cache.replace(this._data.blogListHtml, '<BLOGLIST/>');
        this._data.blogListHtml = this._data.blogListHtml.replace('<\$\$blogList\$\$>', '').replace('</\$\$blogList\$\$>', '');
      }
    },

    /**
     * Get the blog cache file
     * @return {string} the blog cache
     */
    get: function get() {
      return this._data.cache;
    }

    /**
     * Get the blog html
     * @return {string} the inner blog html for lists
     */
  }, {
    key: 'blogHtml',
    get: function get() {
      return this._data.blogHtml;
    },

    /**
     * Set the blog html
     * @param {string} html - the new blog html string
     */
    set: function set(html) {
      this._data.blogHtml = html;
    }

    /**
     * Get the blog List Html
     * @return {string} the blog list html
     */
  }, {
    key: 'blogListHtml',
    get: function get() {
      return this._data.blogListHtml;
    },

    /**
     * Set the blog list html
     * @param {string} html - the new blog list html
     */
    set: function set(html) {
      this._data.blogListHtml = html;
    }
  }]);

  return blogTemplate;
})();

exports['default'] = blogTemplate;
module.exports = exports['default'];