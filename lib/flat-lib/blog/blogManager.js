
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

var _blogJs = require('./blog.js');

var _blogJs2 = _interopRequireDefault(_blogJs);

/**
 * Class to manage all of the blog posts
 * @extends {manager}
 */

var blogManager = (function (_manager) {
    _inherits(blogManager, _manager);

    function blogManager() {
        _classCallCheck(this, blogManager);

        _get(Object.getPrototypeOf(blogManager.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(blogManager, [{
        key: 'create',

        /**
        * Create a new blog post
        * @override
        * @param {string} name - the name of the blog
        * @param {string} title - the title of the blog
        * @param {string} author - the author of the blog
        * @param {string} content - the content of the blog
        * @param {array} tags - the tags of the blog
        * @param {function(err:error,done:boolean)} callback - the callback function
        * @return {function} the callback function
        */
        value: function create(name, title, author, content, tags, callback) {
            var _this = this;

            var newBlog = new _blogJs2['default'](this.dir);
            newBlog.create(name, title, author, content, tags, function (err, done) {
                if (err) {
                    return callback(err, null);
                }
                _this.add(newBlog);
                return callback(null, true);
            });
        }

        /**
         * Int all of the blogs 
         * @override
         */
    }, {
        key: 'init',
        value: function init() {
            var _this2 = this;

            var itemArr = this.subInt();
            itemArr.forEach(function (obj) {
                var newItem = new _blogJs2['default'](_this2.dir, obj.file, obj.data);
                _this2.add(newItem);
            });
        }
    }]);

    return blogManager;
})(_helpersItemsManagerJs2['default']);

exports['default'] = blogManager;
module.exports = exports['default'];