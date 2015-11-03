
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _flatLibServerRouterJs = require('../flat-lib/server/router.js');

var _flatLibServerRouterJs2 = _interopRequireDefault(_flatLibServerRouterJs);

var signinRouter = new _flatLibServerRouterJs2['default']();

signinRouter.use(function (req, res, next) {
    //check if the user has a logged in session
    var ses = signinRouter.controller.sessionManager.getSession(req);
    if (ses !== null) {
        if (ses.getData('username')) {
            res.redirect('/flat-admin');
        } else {
            next();
        }
    } else {
        next();
    }
});

signinRouter.use(function (req, res, next) {
    if (signinRouter.controller.config.getValue('installed') !== 'yes') {
        //redirect to index
        res.redirect('/flat-install');
    } else {
        next();
    }
});

signinRouter.get('/flat-login', function (req, res) {
    res.sendStatic('./flat-static/signin.html');
});

signinRouter.post('/flat-login', function (req, res) {
    var username = req.body.username;
    var pass = req.body.password;
    res.statusCode = 500;
    res.setHeader('content-type', 'text/html; charset=utf8');
    var user = signinRouter.controller.userManager.findByParam('username', username);
    if (user === null) {
        res.end('<h1>No User Found</h1>');
        return;
    }
    if (!user.auth(pass)) {
        res.end('<h1>Pass auth failed</h1>');
        return;
    }
    //set session
    var sesData = { 'username': username };
    signinRouter.controller.sessionManager.create(req, res, sesData, function (err, done) {
        if (err) {
            res.end('<h1>Unable to create session</h1>');
        } else {
            //add to the last login
            var info = signinRouter.controller.info.data;
            info.lastLogin[username] = new Date();
            res.redirect('/flat-admin');
        }
    });
});

signinRouter.always(function (req, res) {
    res.statusCode = 404;
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.end('<h1>Not Found</h1>');
});

exports['default'] = signinRouter;
module.exports = exports['default'];