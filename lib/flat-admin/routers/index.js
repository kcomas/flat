
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _flatLibServerRouterJs = require('../../flat-lib/server/router.js');

var _flatLibServerRouterJs2 = _interopRequireDefault(_flatLibServerRouterJs);

var _helpersShowErrorJs = require('../helpers/showError.js');

var _helpersShowErrorJs2 = _interopRequireDefault(_helpersShowErrorJs);

var _helpersShowSuccessJs = require('../helpers/showSuccess.js');

var _helpersShowSuccessJs2 = _interopRequireDefault(_helpersShowSuccessJs);

var _flatScriptsTailJs = require('../../flat-scripts/tail.js');

var _flatScriptsTailJs2 = _interopRequireDefault(_flatScriptsTailJs);

var indexRouter = new _flatLibServerRouterJs2['default']();

//list the sessions
indexRouter.post('/flat-admin/index/list-sessions', function (req, res) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(indexRouter.controller.sessionManager.toString());
});

//get the current info object
indexRouter.post('/flat-admin/index/info', function (req, res) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(indexRouter.controller.info.toString());
});

//force the info object to disk
indexRouter.post('/flat-admin/index/info/toDisk', function (req, res) {
    indexRouter.controller.info.write(function (err, done) {
        res.setHeader('content-type', 'text/html; charset=utf8');
        if (err) {
            (0, _helpersShowErrorJs2['default'])(req, res, new Error('Failed To Write To Disk'), 500);
            return;
        }
        (0, _helpersShowSuccessJs2['default'])(req, res, 'Info Writen', 200);
    });
});

//grab a log file
indexRouter.post('/flat-admin/index/log', function (req, res) {
    var log = req.body.log;
    var lines = parseInt(req.body.lines);
    if (lines > 500) {
        lines = 500;
    }
    var logDir = indexRouter.controller.config.getValue('logDir');
    (0, _flatScriptsTailJs2['default'])(logDir + log, lines, function (err, file) {
        res.setHeader('content-type', 'text/plain; charset=utf-8');
        res.statusCode = 200;
        if (err) {
            res.end(err);
            return;
        }
        res.end(file);
    });
});

indexRouter.always(function (req, res) {
    (0, _helpersShowErrorJs2['default'])(req, res, new Error("Not Found"), 404);
});

exports['default'] = indexRouter;
module.exports = exports['default'];