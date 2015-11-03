
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _itemJs = require('./item.js');

var _itemJs2 = _interopRequireDefault(_itemJs);

/**
 * This class is used to manage all of the items in an array
 */

var manager = (function () {

    /**
     * @constructor
     * @param {string} dir - the directory of the items
     */

    function manager(dir) {
        _classCallCheck(this, manager);

        /**
         * The directory of the items
         * @type {string}
         */
        this.dir = dir;

        /**
         * The array of items
         * @type {array}
         */
        this.items = [];

        try {
            //check that the dir exists if not create
            var stat = _fs2['default'].lstatSync(this.dir);
        } catch (err) {
            _fs2['default'].mkdirSync(this.dir);
        }
    }

    /**
     * Create a new item based on the current sub class
     * @abstract
     */

    _createClass(manager, [{
        key: 'create',
        value: function create() {}

        /**
         * Load all of the items from file sync use as an init function
         * @abstract
         */
    }, {
        key: 'init',
        value: function init() {}

        /**
         * sub int function to read all files and return data
         * @return {array} the array of the file name and file data for each manager
         */
    }, {
        key: 'subInt',
        value: function subInt() {
            var _this = this;

            var arr = [];
            var files = _fs2['default'].readdirSync(this.dir);
            files.forEach(function (file) {
                var data = _fs2['default'].readFileSync(_this.dir + file, 'utf8');
                try {
                    data = JSON.parse(data);
                    //var newItem = new item(this.dir,file,data);
                    //this.add(newItem);
                    var obj = { file: file, data: data };
                    arr.push(obj);
                } catch (err) {
                    console.log(err);
                }
            });
            return arr;
        }

        /**
         * Set the items array
         * @param {array} newItems - the new items to set
         */
    }, {
        key: 'setAll',
        value: function setAll(newItems) {
            this.itmes = newItems;
        }

        /**
         * Get all of the items in the array
         * @return {array} the array of the items
         */
    }, {
        key: 'all',
        value: function all() {
            return this.items;
        }

        /**
         * Add an item to the items array
         * @param {item} item - the item to be added
         */
    }, {
        key: 'add',
        value: function add(item) {
            this.items.push(item);
        }

        /**
         * Find an item by id
         * @param {string} id - the id to match
         * @return {item} the matching item or null if not found
         */
    }, {
        key: 'findById',
        value: function findById(id) {
            var item = null;
            for (var i = 0, _length = this.items.length; i < _length; i++) {
                if (this.items[i].id === id) {
                    item = this.items[i];
                    break;
                }
            }
            return item;
        }

        /**
         * Remove an item by id also delete from disk
         * @param {string} id - the id to match
         * @param {function(err:error,done:array)} callback - the callback function returns an array of the items removed
         * @return {function} the callback function
         */
    }, {
        key: 'removeById',
        value: function removeById(id, callback) {
            var _this2 = this;

            for (var i = 0, length = this.items.length; i < length; i++) {
                if (this.items[i].id === id) {
                    break;
                }
            }
            if (i === length) {
                return callback(new Error("Item Not Found"), null);
            }
            this.items[i].unlink(function (err, done) {
                if (err) {
                    return callback(err, null);
                }
                var removed = _this2.items.splice(i, 1);
                return callback(null, removed);
            });
        }

        /**
         * Find an item by a param in the item.data only if its a non array,object
         * @param {string} key - the key of the param
         * @param {string|number|date|boolean} value - the value of the param
         * @return {item} - the item or null if not found
         */
    }, {
        key: 'findByParam',
        value: function findByParam(key, value) {
            var item = null;
            for (var i = 0, _length2 = this.items.length; i < _length2; i++) {
                if (this.items[i].data[key] === value) {
                    item = this.items[i];
                    break;
                }
            }
            return item;
        }

        /**
         * Find many items by a param
         * @param {string} key - the key of the param
         * @param {string|number|date|boolean} value - the value of the param
         * @return {arry} - the items or [] if not found
         */
    }, {
        key: 'findManyByParam',
        value: function findManyByParam(key, value) {
            var item = [];
            this.items.forEach(function (it) {
                if (it.data[key] === value) {
                    item.push(it);
                }
            });
            return item;
        }

        /**
         * Find a single item by many params
         * @param {object} obj - the object to be used in the search
         * @property {string} key - the key of the param to find
         * @property {string|number|boolean|null} value - the value to match
         * @return {item} item - the matched item or null if not found
         */
    }, {
        key: 'findByManyParams',
        value: function findByManyParams(obj) {
            var item = null;
            //obj keys
            var keys = Object.keys(obj);
            var keyLength = keys.length;
            for (var i = 0, l = this.items.length; i < l; i++) {
                for (var x = 0; x < keyLength; x++) {
                    if (this.items[i].data[keys[x]] !== obj[keys[x]]) {
                        break;
                    }
                }
                if (x === keyLength) {
                    item = this.items[i];
                    break;
                }
            }
            return item;
        }

        /**
         * Delete an item by a param in the item.data only if non array,object
         * @param {string} key - the key of the param
         * @param {string|number|date|boolean} value - the value of the param
         * @param {function(err:error,done:array)} callback - callback function returns array of removed items
         * @return {function} the callback function
         */
    }, {
        key: 'removeByParam',
        value: function removeByParam(key, value, callback) {
            var _this3 = this;

            for (var i = 0, length = this.items.length; i < length; i++) {
                if (this.items[i].data[key] === value) {
                    break;
                }
            }
            if (i === length) {
                return callback(new Error("Item Not Found"), null);
            }
            this.items[i].unlink(function (err, done) {
                if (err) {
                    return callback(err, null);
                }
                var removed = _this3.items.splice(i, 1);
                return callback(null, removed);
            });
        }

        /**
         * Convert all of the items to a JSON sting
         * @return {string} the string of the json array
         */
    }, {
        key: 'toString',
        value: function toString() {
            var str = '[';
            this.items.forEach(function (item) {
                str += item.toString() + ',';
            });
            str += ']';
            return str.replace(/,(?=[^,]*$)/, '');
        }
    }]);

    return manager;
})();

exports['default'] = manager;
module.exports = exports['default'];