
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/**
 * Class to log incoming requests to file and console
 */

var flatLog = (function () {

    /*
     * @constructor
     * @param {string} dir - the dir to store the log files
     * @param {boolean} console - log to console if true
     */

    function flatLog(dir, console) {
        _classCallCheck(this, flatLog);

        /**
         * The dir we save the logs to
         * @type {string}
         */
        this._dir = dir;

        //make sure the dir exists
        if (!_fs2['default'].existsSync(dir)) {
            _fs2['default'].mkdirSync(dir);
        }

        /**
         * The boolean if we log to console
         * @type {boolean}
         */
        this._console = console;

        /**
         * The non 200,300 log
         * @type {string}
         */
        this.errorLog = 'error.log';

        /**
         * The 200,300 log
         * @type {string}
         */
        this.accessLog = 'access.log';
    }

    /**
     * Log a request
     * @return {function(req:object,res:object,next:function)} - the standard for middlewear
     */

    _createClass(flatLog, [{
        key: 'log',
        value: function log() {
            var _this = this;

            return function (req, res, next) {
                req.startTime = new Date();
                res.on('finish', function () {
                    var done = new Date();
                    var logObj = {
                        status: res.statusCode,
                        method: req.method,
                        ms: done - req.startTime,
                        url: req.url,
                        ip: req.headers['x-real-ip'],
                        userAgent: req.headers['user-agent'],
                        date: done
                    };
                    if (_this._console === "true") {
                        console.dir(logObj);
                    }
                    var strCode = res.statusCode.toString();
                    if (strCode[0] === '3' || strCode[0] === '2') {
                        var file = _this.accessLog;
                    } else {
                        var file = _this.errorLog;
                    }
                    _fs2['default'].appendFile(_this._dir + file, JSON.stringify(logObj).replace('{', '').replace('}', '') + '\n', 'utf8', function (err) {
                        if (err) {
                            console.dir(err);
                        }
                    });
                });
                next();
            };
        }
    }]);

    return flatLog;
})();

exports['default'] = flatLog;
module.exports = exports['default'];