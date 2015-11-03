
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

var _uploadJs = require('./upload.js');

var _uploadJs2 = _interopRequireDefault(_uploadJs);

/**
 * Manages all of the uploads
 * @extends {item} 
 */

var uploadManager = (function (_manager) {
    _inherits(uploadManager, _manager);

    function uploadManager() {
        _classCallCheck(this, uploadManager);

        _get(Object.getPrototypeOf(uploadManager.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(uploadManager, [{
        key: 'create',

        /**
         * Create a new upload item
         * @override
         * @param {string} filename - the filename
         * @param {boolean} priv - indicates if the file is private or not
         * @param {string} mime - the mime type
         * @param {function(err:err,done:boolean)} callback - done is true if the obj was created
         * @return {function} the callback function
         */
        value: function create(filename, priv, mime, callback) {
            var _this = this;

            var up = new _uploadJs2['default'](this.dir);
            up.create(filename, priv, mime, function (err, done) {
                if (err) {
                    return callback(err, null);
                }
                _this.add(up);
                return callback(null, true);
            });
        }

        /**
         * Int all of the uploads
         * @override
         */
    }, {
        key: 'init',
        value: function init() {
            var _this2 = this;

            var itemArr = this.subInt();
            itemArr.forEach(function (obj) {
                var newItem = new _uploadJs2['default'](_this2.dir, obj.file, obj.data);
                _this2.add(newItem);
            });
        }
    }]);

    return uploadManager;
})(_helpersItemsManagerJs2['default']);

exports['default'] = uploadManager;
module.exports = exports['default'];