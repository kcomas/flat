
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _helpersItemsItemJs = require('../helpers/items/item.js');

var _helpersItemsItemJs2 = _interopRequireDefault(_helpersItemsItemJs);

/**
 * The session class for session
 * @extends {item}
 */

var session = (function (_item) {
    _inherits(session, _item);

    function session() {
        _classCallCheck(this, session);

        _get(Object.getPrototypeOf(session.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(session, [{
        key: 'create',

        /**
         * Create a new session
         * @override
         * @param {object} req - the request object
         * @param {object} res - the response object
         * @param {object} sesData - the session data
         * @param {function(err:error,done:boolean)} callback - the callback function done is true if created
         * @return {function} the callback function
         */
        value: function create(req, res, sesData, callback) {
            var _this = this;

            this.genId(function (err, done) {
                if (err) {
                    return callback(err, null);
                }
                //create a new cookie
                _this.data.dateCreated = new Date();
                _this.data.cookieName = req.sessionCookieName;
                var cookieObj = res.setCookie(req.sessionCookieName, _this.id, req.sessionCookieTime, '/');
                _this.data.expires = cookieObj.expires;
                _this.data.userAgent = req.headers['user-agent'];
                _this.data.ip = req.headers['x-real-ip'];
                _this.data.sesData = sesData;
                _this.save(function (err, done) {
                    return callback(err, done);
                });
            });
        }

        /**
         * Get the session data by a param
         * @param {string} name - the name of the session var to get
         * @return {object|array|string|number|null|date} the session data item
         */
    }, {
        key: 'getData',
        value: function getData(name) {
            return this.data.sesData[name] || null;
        }

        /**
         * Add to the session data
         * @param {string} key - the key for the new data
         * @param {string|object|number|date,array,null} value - the new data
         */
    }, {
        key: 'addData',
        value: function addData(key, value) {
            this.data.sesData[key] = value;
        }

        /**
         * Remove from the session data
         * @param {string} key - the key for the data to delete
         */
    }, {
        key: 'deleteData',
        value: function deleteData(key) {
            delete this.data.sesData[key];
        }

        /**
         * Is the session expired?
         * @return {boolean} if the session is expired
         */
    }, {
        key: 'destroy',

        /**
         * Remove a session
         * @param {object} res - the response object
         * @param {function(error:err,done:boolean)} callback - done is true if the session was deleted
         * @return {function} - the callback function
         */
        value: function destroy(res, callback) {
            res.removeCookie(this.data.cookieName, '/');
            this.unlink(function (err, done) {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, true);
            });
        }
    }, {
        key: 'expired',
        get: function get() {
            var date = new Date();
            if (date > this.data.expires) {
                return true;
            }
            return false;
        }
    }]);

    return session;
})(_helpersItemsItemJs2['default']);

exports['default'] = session;
module.exports = exports['default'];