
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

var userRouter = new _flatLibServerRouterJs2['default']();

//get the cuurent user
userRouter.post('/flat-admin/user/current', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf8');
    res.end(req.user.toString());
});

//update the current user
userRouter.post('/flat-admin/user/current/update', function (req, res) {
    var email = req.body.email;
    var changePass = req.body.changePass;
    var passA = req.body.passA;
    var passB = req.body.passB;
    req.user.upsert({ 'email': email }, function (err, done) {
        if (err) {
            (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
            return;
        }
        if (changePass === true) {
            if (passA === passB) {
                req.user.password(passA, function (err, done) {
                    if (err) {
                        (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
                        return;
                    }
                    (0, _helpersShowSuccessJs2['default'])(req, res, "Email/Password Updated", 200);
                });
            } else {
                (0, _helpersShowErrorJs2['default'])(req, res, new Error("Passwords Do Not Match"), 500);
            }
        } else {
            (0, _helpersShowSuccessJs2['default'])(req, res, "Email Updated", 200);
        }
    });
});

//list all of the users
userRouter.post('/flat-admin/user/list', function (req, res) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json; charset=utf8');
    res.end(userRouter.controller.userManager.toString());
});

//add a new user
userRouter.post('/flat-admin/user/add', function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var passA = req.body.passA;
    var passB = req.body.passB;
    if (passA !== passB) {
        (0, _helpersShowErrorJs2['default'])(req, res, new Error("Passwords Do Not Match"), 500);
        return;
    }
    userRouter.controller.userManager.create(username, email, passA, function (err, done) {
        if (err) {
            (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
            return;
        }
        (0, _helpersShowSuccessJs2['default'])(req, res, "User Created", 200);
    });
});

userRouter.always(function (req, res) {
    (0, _helpersShowErrorJs2['default'])(req, res, new Error("Not Found"), 404);
});

exports['default'] = userRouter;
module.exports = exports['default'];