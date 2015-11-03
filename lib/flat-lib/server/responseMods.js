
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = responseMods;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/**
 * This function adds new methods to the response object
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {number} port - the server port number
 */

function responseMods(req, res, port) {
    //redirect to a url on the site
    res.redirect = function (path) {
        res.writeHead(302, { 'Location': path });
        res.end();
    };

    //send a static file without modifications
    res.sendStatic = function (file) {
        _fs2['default'].readFile(file, 'utf8', function (err, fileStr) {
            res.setHeader('content-type', 'text/html; charset=utf-8');
            if (err) {
                console.dir(err);
                res.statusCode = 500;
                res.end('Failed To Load Static File');
            } else {
                res.statusCode = 200;
                res.end(fileStr);
            }
        });
    };
}

module.exports = exports['default'];