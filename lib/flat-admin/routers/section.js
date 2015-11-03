
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

var sectionRouter = new _flatLibServerRouterJs2['default']();

//add/update a section to the sectionManager
sectionRouter.post('/flat-admin/section/upsert', function (req, res) {
    var name = req.body.name;
    var content = req.body.content;
    //find if it exists
    var section = sectionRouter.controller.sectionManager.findByParam('name', name);
    if (section === null) {
        sectionRouter.controller.sectionManager.create(name, content, function (err, done) {
            if (err) {
                showerror(req, res, err, 500);
            } else {
                (0, _helpersShowSuccessJs2['default'])(req, res, "updated/saved", 200);
            }
        });
    } else {
        section.upsert({ 'layout': content }, function (err, done) {
            if (err) {
                showerror(req, res, err, 500);
            }
            (0, _helpersShowSuccessJs2['default'])(req, res, "updated/saved", 200);
        });
    }
});

//list all of the sections
sectionRouter.post('/flat-admin/section/list', function (req, res) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json; charset=utf8');
    res.end(sectionRouter.controller.sectionManager.toString());
});

//delete section
sectionRouter.post('/flat-admin/section/remove', function (req, res) {
    var item = sectionRouter.controller.sectionManager.removeByParam('name', req.body.name, function (err, done) {
        if (err) {
            (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
        } else {
            (0, _helpersShowSuccessJs2['default'])(req, res, "item deleted", 200);
        }
    });
});

sectionRouter.always(function (req, res) {
    (0, _helpersShowErrorJs2['default'])(req, res, new Error("Not Found"), 404);
});

exports['default'] = sectionRouter;
module.exports = exports['default'];