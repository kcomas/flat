"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = cookies;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

/**
 * This gives cookie functions to the req and res objects
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @return {object} req/res the request response
 * @property {array} req.cookies the cookies from the request
 * @property {array} res.cookies the cookies to be sent
 * @property {function} res.setCookie sets a cookie
 * @property {function} res.removeCookie removes a cookie
 */

function cookies(req, res) {

  /**
   * Load the cookies
   * @type {object}
   */
  req.cookies = _querystring2['default'].parse(req.headers.cookie, ';', '=');

  /*
   *  Set up for cookie sending
   *  @type {object}
   */
  res.cookies = [];

  /*
   * Set a cookie for sending
   * @param {string} name - the name of the cookie
   * @param {string} value - the value of the cookie
   * @param {number} expires - the timespan of the cookie
   * @param {string} domain - the domain of the cookie
   * @param {string} path - the path of the cookie
   * @return {object} the cookie that was added
   * @property {string} name the cookie name
   * @property {string} value the cookie value
   * @poperty {number} the timespan of the cookie
   * @property {string} domain the domain of the cookie
   * @property {sting} path the path of the cookie
   */
  res.setCookie = function (name, value, expires, path, domain) {
    var cookie = {};
    cookie[name] = value;
    cookie.expires = new Date(Date.now() + expires).toUTCString();
    if (domain) {
      cookie.domain = domain;
    }
    if (path) {
      cookie.path = path;
    }
    var cookieStr = _querystring2['default'].stringify(cookie, ';', '=');
    res.cookies.push(_querystring2['default'].unescape(cookieStr));
    res.setHeader('Set-Cookie', res.cookies);
    return cookie;
  };

  /*
   * Remove an existing cookie
   * @param {string} name - the name of the cookie
   */
  res.removeCookie = function (name, path) {
    res.setCookie(name, '', 0, path);
  };
}

module.exports = exports['default'];