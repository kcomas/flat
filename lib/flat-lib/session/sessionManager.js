
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

var _sessionJs = require('./session.js');

var _sessionJs2 = _interopRequireDefault(_sessionJs);

/**
 * The session manager for handeling all sessions
 * @extends {manager}
 */

var sessionManager = (function (_manager) {
    _inherits(sessionManager, _manager);

    function sessionManager() {
        _classCallCheck(this, sessionManager);

        _get(Object.getPrototypeOf(sessionManager.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(sessionManager, [{
        key: 'create',

        /**
         * Create a new session
         * @override
         * @param {object} req - the request object
         * @param {object} res - the response object
         * @param {object} sesData - the session data 
         * @param {function(err:error,done:boolean)} callback - done is true if the session was created
         * @return {function} the callback function
         */
        value: function create(req, res, sesData, callback) {
            var _this = this;

            var ses = new _sessionJs2['default'](this.dir);
            ses.create(req, res, sesData, function (err, done) {
                if (err) {
                    return callback(err, null);
                }
                _this.add(ses);
                return callback(null, true);
            });
        }

        /**
         * Int all of the sessions
         * @override
         */
    }, {
        key: 'init',
        value: function init() {
            var _this2 = this;

            var itemArr = this.subInt();
            itemArr.forEach(function (obj) {
                var newItem = new _sessionJs2['default'](_this2.dir, obj.file, obj.data);
                _this2.add(newItem);
            });
        }

        /**
         * Get a session from a cookie
         * @param {object} req - the request object
         * @return {session} return a session object or null if not found
         */
    }, {
        key: 'getSession',
        value: function getSession(req) {
            var ses = null;
            if (!req.cookies[req.sessionCookieName]) {
                return null;
            }
            for (var i = 0, l = this.items.length; i < l; i++) {
                if (this.items[i].id === req.cookies[req.sessionCookieName]) {
                    ses = this.items[i];
                    break;
                }
            }
            return ses;
        }

        /**
         * Remove a session from memoery and disk
         * @param {object} req - the request object
         * @param {object} res - the response object
         * @param {function(err:error,done:boolean)} callback - done is true if the session was removed
         * @return {function} the callback function
         */
    }, {
        key: 'destroy',
        value: function destroy(req, res, callback) {
            var _this3 = this;

            if (!req.cookies[req.sessionCookieName]) {
                return callback(new Error('No session found'), null);
            }
            for (var i = 0, l = this.items.length; i < l; i++) {
                if (this.items[i].id === req.cookies[req.sessionCookieName]) {
                    break;
                }
            }
            if (i === l) {
                return callback(new Error('No session found'), null);
            }
            this.items[i].destroy(res, function (err, done) {
                if (err) {
                    return callback(err, null);
                }
                _this3.items.splice(i, 1);
                return callback(null, true);
            });
        }

        /**
         * Syncronously remove all of the expired and orphaned sessions
         */
    }, {
        key: 'clean',
        value: function clean() {
            for (var i = 0, l = this.items.length; i < l; i++) {
                if (this.items[i].expired) {
                    this.items[i].unlinkSync();
                    this.items.splice(i, 1);
                    i--;
                }
            }
            //removes the nulls from the array
        }
    }]);

    return sessionManager;
})(_helpersItemsManagerJs2['default']);

exports['default'] = sessionManager;
module.exports = exports['default'];