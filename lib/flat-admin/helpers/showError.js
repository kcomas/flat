
"use strict";

//show better json errors
Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = showError;
Object.defineProperty(Error.prototype, 'toJSON', {
    value: function value() {
        var _this = this;

        var alt = {};
        Object.getOwnPropertyNames(this).forEach(function (key) {
            alt[key] = _this[key];
        }, this);
        return alt;
    },
    configurable: true
});

/**
 * Render a json error page
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {error} err - the json error object
 * @param {number} status - the status code
 */

function showError(req, res, err, status) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf8');
    res.end(JSON.stringify(err, null, 2));
}

module.exports = exports['default'];