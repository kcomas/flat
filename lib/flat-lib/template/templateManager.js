
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

var _templateJs = require('./template.js');

var _templateJs2 = _interopRequireDefault(_templateJs);

/**
 * This class manages the templates
 * @extend {manager}
 */

var templateManager = (function (_manager) {
    _inherits(templateManager, _manager);

    function templateManager() {
        _classCallCheck(this, templateManager);

        _get(Object.getPrototypeOf(templateManager.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(templateManager, [{
        key: 'create',

        /**
         * Create a new template and add to items
         * @override
         * @param {string} name - the name of the template
         * @param {object} layout - the layout of the template
         * @param {function(err:error,done:boolean)} callback - done is true if the template was created
         * @return {function} the callback function
         */
        value: function create(name, layout, callback) {
            var _this = this;

            var tmp = new _templateJs2['default'](this.dir);
            tmp.create(name, layout, function (err, done) {
                if (err) {
                    return callback(err, null);
                }
                _this.add(tmp);
                return callback(null, true);
            });
        }

        /**
         * Int all of the templates
         * @override
         */
    }, {
        key: 'init',
        value: function init() {
            var _this2 = this;

            var itemArr = this.subInt();
            itemArr.forEach(function (obj) {
                var newItem = new _templateJs2['default'](_this2.dir, obj.file, obj.data);
                _this2.add(newItem);
            });
        }
    }]);

    return templateManager;
})(_helpersItemsManagerJs2['default']);

exports['default'] = templateManager;
module.exports = exports['default'];