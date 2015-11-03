"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = urlMods;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

/**
 * This function modifies the url
 * @param {object} req - the request object
 * @return {object} the request object
 * @property {string} req.url the modified url as only the path
 * @property {object} req.parsedUrl the parsed url
 * @property {object} req.query the query of the url as an object
 */

function urlMods(req) {
  req.parsedUrl = _url2["default"].parse(req.url, true);
  req.url = req.parsedUrl.pathname;
  req.query = req.parsedUrl.query;
}

module.exports = exports["default"];