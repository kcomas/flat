
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _helpersItemsManagerJs = require('../helpers/items/manager.js');

var _helpersItemsManagerJs2 = _interopRequireDefault(_helpersItemsManagerJs);

var _cacheJs = require('./cache.js');

var _cacheJs2 = _interopRequireDefault(_cacheJs);

/**
 * This is the file memory store of the generated pages
 * @extends {manager}
 */

var cacheManager = (function (_manager) {
    _inherits(cacheManager, _manager);

    function cacheManager() {
        _classCallCheck(this, cacheManager);

        _get(Object.getPrototypeOf(cacheManager.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(cacheManager, [{
        key: 'create',

        /**
         * Create a new cache
         * @override
         * @param {string} permalink - the permalink of the page
         * @param {string} fileStr - the string of the page
         * @param {function(err:error,done:boolean)} callback - the callback function
         * @return {function} the callback
         */
        value: function create(permalink, fileStr, callback) {
            var _this = this;

            var newCache = new _cacheJs2['default'](this.dir);
            newCache.create(permalink, fileStr, function (err, done) {
                if (err) {
                    return callback(err, null);
                }
                _this.add(newCache);
                return callback(null, true);
            });
        }

        /**
         * Int all of the caches 
         * @override
         */
    }, {
        key: 'init',
        value: function init() {
            var _this2 = this;

            var itemArr = this.subInt();
            itemArr.forEach(function (obj) {
                var newItem = new _cacheJs2['default'](_this2.dir, obj.file, obj.data);
                _this2.add(newItem);
            });
        }

        /**
         * Retrive a certian number of items based
         * @param {number} start - the starting number in the loop
         * @param {number} total - the total number to collect
         * @return {string} the items collected as the filestr
         */
    }, {
        key: 'getSelection',
        value: function getSelection(start, total) {
            var ret = '';
            if (start > 0) {
                start = start * total - 1;
            }
            for (var i = start, n = 0; n < total; n++) {
                if (i >= this.items.length) {
                    break;
                }
                ret += this.items[i].get('fileStr');
                i++;
            }
            return ret;
        }
    }]);

    return cacheManager;
})(_helpersItemsManagerJs2['default']);

exports['default'] = cacheManager;
module.exports = exports['default'];