
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _idGenJs = require('../idGen.js');

var _idGenJs2 = _interopRequireDefault(_idGenJs);

var _fileManagerJs = require('../fileManager.js');

var _fileManagerJs2 = _interopRequireDefault(_fileManagerJs);

/**
 * This class is to be used for users,sessions,pages,sections it provides a template for all to extend
 */

var item = (function () {

    /**
     * @constructor
     * @param {string} dir - the directory of the item
     * @param {string} filename - the filename of the item
     * @param {object} data - the data of the item
     */

    function item(dir, filename, data) {
        _classCallCheck(this, item);

        /**
         * The filename of the item
         * @type {string}
         */
        this.filename = filename || '';

        /**
         * The id of the item, the filename without .json
         */
        this.id = '';

        if (this.filename !== '') {
            this.id = this.filename.replace('.json', '');
        }

        /**
         * The data of the item
         * @type {object}
         */
        this.data = data || {};

        /**
         * The filemanger for the object
         * @type {object}
         */
        this.fileManager = new _fileManagerJs2['default'](dir);

        /**
         * The id generator
         * @type function
         */
        this.idGen = _idGenJs2['default'];
    }

    /**
     * This method is diferent depening on the sub class
     * @abstract
     */

    _createClass(item, [{
        key: 'create',
        value: function create() {}

        /**
         * Save the object to disk
         * @param {function(err:error,done:boolean)} callback - if the file was saved or not
         * @return {function} the callback if error or if the file saved
         */
    }, {
        key: 'save',
        value: function save(callback) {
            this.fileManager.save(this.filename, this.data, function (err, done) {
                return callback(err, done);
            });
        }

        /**
         * Load a file from disk
         * @param {function(err:error,done:boolean)} callback - if the file was loaded or not
         * @return {function} the callack if the file loaded or not
         */
    }, {
        key: 'load',
        value: function load(callback) {
            var _this = this;

            this.fileManager.load(this.filename, function (err, obj) {
                if (err) {
                    return callback(err, null);
                }
                _this.data = obj;
                return callback(null, true);
            });
        }

        /**
         * Remove a file from disk
         * @param {function(err:error,done:boolean)} callback - if the file was deleted or error
         * @return {function} the callback function
         */
    }, {
        key: 'unlink',
        value: function unlink(callback) {
            this.fileManager.unlink(this.filename, function (err, done) {
                return callback(err, done);
            });
        }

        /**
         * Remove File from the disk syncronusly
         */
    }, {
        key: 'unlinkSync',
        value: function unlinkSync() {
            this.fileManager.unlinkSync(this.filename);
        }

        /**
         * Generate an id and filename
         * @return {function(err:error,done:boolean)} the callback if the id was generated or not
         */
    }, {
        key: 'genId',
        value: function genId(callback) {
            var _this2 = this;

            if (this.filename === '' && this.id === '') {
                this.idGen(function (err, id) {
                    _this2.id = id;
                    _this2.filename = id + '.json';
                    return callback(null, true);
                });
            } else {
                return callback(new Error("Id allready generated"), null);
            }
        }

        /**
         * UpdateInsert the data var and write to disk
         * @param {object} obj - the object to be added
         * @param {function(err:error,done:boolean)} callback - the status of the update done is true if update is sucessful
         * @return {function} the callback function
         */
    }, {
        key: 'upsert',
        value: function upsert(obj, callback) {
            for (var key in obj) {
                this.data[key] = obj[key];
            }
            this.save(function (err, done) {
                return callback(err, done);
            });
        }

        /**
         * Delete from the data var and save to disk
         * @param {array} keys - the keys to be deleted
         * @param {function(err:error,done:boolean)} callback - the status if the delete was sucessful done is true if the delete was a success
         * @return {function} the callback function
         */
    }, {
        key: 'del',
        value: function del(keys, callback) {
            var _this3 = this;

            keys.forEach(function (key) {
                delete _this3.data[key];
            });
            this.save(function (err, done) {
                return callback(err, done);
            });
        }

        /**
         * Get a key value from the data obj
         * @param {string} key - the key of the value to get
         * @return {object|array|string|number|date|null|undefined} the value of the key
         */
    }, {
        key: 'get',
        value: function get(key) {
            return this.data[key];
        }

        /**
         * Convert the item to a json string
         * @return {string} the json string of the data
         */
    }, {
        key: 'toString',
        value: function toString() {
            return JSON.stringify(this.data, null, 2);
        }
    }]);

    return item;
})();

exports['default'] = item;
module.exports = exports['default'];