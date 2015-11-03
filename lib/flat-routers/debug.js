
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _flatLibServerRouterJs = require('../flat-lib/server/router.js');

var _flatLibServerRouterJs2 = _interopRequireDefault(_flatLibServerRouterJs);

var debugRouter = new _flatLibServerRouterJs2['default']();

debugRouter.use(function (req, res, next) {
    if (debugRouter.controller.config.getValue('debugEnabled') === 'true') {
        next();
    } else {
        res.redirect('/');
    }
});

debugRouter.get('/flat-debug/view', function (req, res) {
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    var jsonString = '';
    var manager = req.query.manager;
    if (manager) {
        try {
            jsonString = JSON.stringify(debugRouter.controller[manager], null, 2);
        } catch (err) {
            jsonString = JSON.stringify(debugRouter.controller, null, 2);
        }
    } else {
        jsonString = JSON.stringify(debugRouter.controller, null, 2);
    }
    res.statusCode = 200;
    res.end(jsonString);
});

debugRouter.always(function (req, res) {
    res.statusCode = 404;
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.end('<h1>Not Found</h1>');
});

exports['default'] = debugRouter;
module.exports = exports['default'];