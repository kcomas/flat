
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

var _helpersEmailValJs = require('../helpers/emailVal.js');

var _helpersEmailValJs2 = _interopRequireDefault(_helpersEmailValJs);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

/**
 * This is the user class for managing user data
 * @extends {item}
 */

var user = (function (_item) {
    _inherits(user, _item);

    function user() {
        _classCallCheck(this, user);

        _get(Object.getPrototypeOf(user.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(user, [{
        key: 'create',

        /**
         * Create a user
         * @override
         * @param {string} username - the user name of the account
         * @param {string} email - the email of the account
         * @param {string} pass - the password of the account
         * @param {function(err:err,done:boolean)} callback - if true the user was created 
         * @return {function} the callback function
         */
        value: function create(username, email, pass, callback) {
            var _this = this;

            //check email
            if (!(0, _helpersEmailValJs2['default'])(email)) {
                return callback(new Error("Invalid Email"), null);
            }
            //generate id
            this.genId(function (err, done) {
                if (err) {
                    return callback(err, null);
                }
                _this.data.username = username;
                _this.data.email = email;
                _this.data.dateCreated = new Date();
                //create a password
                _this.password(pass, function (err, done) {
                    if (err) {
                        return callback(err, null);
                    }
                    _this.save(function (err, done) {
                        return callback(err, done);
                    });
                });
            });
        }

        /**
         * Create or change a password sets hash and salt
         * @param {string} pass - the password to add
         * @param {function(err:error,done:boolean)} callback - the callback if created error or true
         * @return {function} the callback function
         */
    }, {
        key: 'password',
        value: function password(pass, callback) {
            var _this2 = this;

            _crypto2['default'].randomBytes(12, function (err, bytes) {
                if (err) {
                    return callback(err, null);
                }
                _this2.data.salt = bytes.toString();
                var hash = _crypto2['default'].createHash('sha512');
                hash.update(pass, 'utf8');
                hash.update(_this2.data.salt, 'utf8');
                _this2.data.hash = hash.digest('base64');
                return callback(null, true);
            });
        }

        /**
         * Authenticate a user
         * @param {string} pass - the password to check
         * @return {boolean} if the password matches or not
         */
    }, {
        key: 'auth',
        value: function auth(pass) {
            var hash = _crypto2['default'].createHash('sha512');
            hash.update(pass, 'utf8');
            hash.update(this.data.salt, 'utf8');
            hash = hash.digest('base64');
            if (hash !== this.data.hash) {
                return false;
            }
            return true;
        }

        /**
         * Convert the user to string and hide the username and password
         * @override
         * @return {object} the user object wihout the salt or hash
         */
    }, {
        key: 'toString',
        value: function toString() {
            var newUser = {};
            newUser.username = this.data.username;
            newUser.email = this.data.email;
            newUser.dateCreated = this.data.dateCreated;
            return JSON.stringify(newUser, null, 2);
        }
    }]);

    return user;
})(_helpersItemsItemJs2['default']);

exports['default'] = user;
module.exports = exports['default'];