
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

var _flatLibHelpersUploadedFilesJs = require('../../flat-lib/helpers/uploadedFiles.js');

var _flatLibHelpersUploadedFilesJs2 = _interopRequireDefault(_flatLibHelpersUploadedFilesJs);

var templateRouter = new _flatLibServerRouterJs2['default']();

//add update a template
templateRouter.post('/flat-admin/template/upsert', function (req, res) {
    var name = req.body.name;
    var layout = req.body.layout;
    try {
        JSON.parse(layout);
    } catch (err) {
        (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
        return;
    }
    var template = templateRouter.controller.templateManager.findByParam('name', name);
    if (template === null) {
        templateRouter.controller.templateManager.create(name, layout, function (err, done) {
            if (err) {
                (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
            } else {
                (0, _helpersShowSuccessJs2['default'])(req, res, 'update/saved', 200);
            }
        });
    } else {
        template.upsert({ 'layout': layout }, function (err, done) {
            if (err) {
                (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
            } else {
                (0, _helpersShowSuccessJs2['default'])(req, res, 'update/saved', 200);
            }
        });
    }
});

//list all of the templates
templateRouter.post('/flat-admin/template/list', function (req, res) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json; charset=utf8');
    res.end(templateRouter.controller.templateManager.toString());
});

//delete template
templateRouter.post('/flat-admin/template/remove', function (req, res) {
    var item = templateRouter.controller.templateManager.removeByParam('name', req.body.name, function (err, done) {
        if (err) {
            (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
        } else {
            (0, _helpersShowSuccessJs2['default'])(req, res, "item deleted", 200);
        }
    });
});

//load a private file
templateRouter.post('/flat-admin/template/load-private', function (req, res) {
    var filename = req.body.filename;
    var item = templateRouter.controller.uploadManager.findByManyParams({ 'fileName': filename, 'private': true });
    if (item === null) {
        (0, _helpersShowErrorJs2['default'])(req, res, new Error('private file not found'), 500);
    } else {
        templateRouter.controller.uploader.readFile(templateRouter.controller.uploader.privateDir + filename, function (err, mime, file) {
            if (err) {
                (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
            } else {
                res.statusCode = 200;
                res.setHeader('content-type', mime + '; charset=utf-8');
                res.end(file);
            }
        });
    }
});

//load a private file
templateRouter.get('/flat-admin/template/load-private', function (req, res) {
    var filename = req.query.filename;
    var item = templateRouter.controller.uploadManager.findByManyParams({ 'fileName': filename, 'private': true });
    if (item === null) {
        (0, _helpersShowErrorJs2['default'])(req, res, new Error('private file not found'), 500);
    } else {
        templateRouter.controller.uploader.readFile(templateRouter.controller.uploader.privateDir + filename, function (err, mime, file) {
            if (err) {
                (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
            } else {
                res.statusCode = 200;
                res.setHeader('content-type', mime + '; charset=utf-8');
                res.end(file);
            }
        });
    }
});

//download a template
templateRouter.get('/flat-admin/template/download', function (req, res) {
    var name = req.query.name;
    var template = templateRouter.controller.templateManager.findByParam('name', name);
    if (template === null) {
        (0, _helpersShowErrorJs2['default'])(req, res, new Error('template not found'), 500);
    } else {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json; charset=utf-8');
        res.end(template.get('layout'));
    }
});

templateRouter.always(function (req, res) {
    (0, _helpersShowErrorJs2['default'])(req, res, new Error("Not Found"), 404);
});

exports['default'] = templateRouter;
module.exports = exports['default'];