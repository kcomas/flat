
"use strict";

//install router only used to create a user at first load

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _flatLibServerRouterJs = require('../flat-lib/server/router.js');

var _flatLibServerRouterJs2 = _interopRequireDefault(_flatLibServerRouterJs);

var installRouter = new _flatLibServerRouterJs2['default']();

installRouter.use(function (req, res, next) {
    if (installRouter.controller.config.getValue('installed') === 'yes') {
        //redirect to index
        res.redirect('/flat-login');
    } else {
        next();
    }
});

//get the install page
installRouter.get('/flat-install', function (req, res) {
    res.sendStatic('./flat-static/install.html');
});

installRouter.post('/flat-install', function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var pass = req.body.password;
    installRouter.controller.userManager.create(username, email, pass, function (err, done) {
        if (err) {
            console.dir(err);
            res.statusCode = 500;
            res.setHeader('content-type', 'text/html; charset=utf8');
            res.end('Failed To Install');
        } else {
            installRouter.controller.config.setValue('installed', 'yes');
            res.redirect('/flat-login');
        }
    });
});

installRouter.always(function (req, res) {
    res.statusCode = 404;
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.end('<h1>Not Found</h1>');
});

exports['default'] = installRouter;
module.exports = exports['default'];