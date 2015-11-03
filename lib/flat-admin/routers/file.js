
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

var fileRouter = new _flatLibServerRouterJs2['default']();

//upload a file
fileRouter.post('/flat-admin/file/upload', function (req, res) {
    if (req.body['private'] === 'true') {
        var pri = true;
    } else {
        var pri = false;
    }
    var mType = _flatLibHelpersUploadedFilesJs2['default'].mimeType(req.body.files.fileData.filename);
    var upload = fileRouter.controller.uploadManager.findByParam('fileName', req.body.files.fileData.filename);
    if (upload === null) {
        fileRouter.controller.uploadManager.create(req.body.files.fileData.filename, pri, mType, function (err, done) {
            if (err) {
                (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
            } else {
                fileRouter.controller.uploader.writeFile(pri, req.body.files.fileData.filename, mType, req.body.files.fileData.data, function (err, done) {
                    if (err) {
                        (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
                    } else {
                        (0, _helpersShowSuccessJs2['default'])(req, res, 'file saved', 200);
                    }
                });
            }
        });
    } else {
        upload.upsert({ 'private': pri, 'fileName': req.body.files.fileData.filename, 'mime': mType }, function (err, done) {
            if (err) {
                (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
            } else {
                fileRouter.controller.uploader.writeFile(pri, req.body.files.fileData.filename, mType, req.body.files.fileData.data, function (err, done) {
                    if (err) {
                        (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
                    } else {
                        (0, _helpersShowSuccessJs2['default'])(req, res, 'file saved', 200);
                    }
                });
            }
        });
    }
});

//list all of the files
fileRouter.post('/flat-admin/file/list', function (req, res) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json; charset=utf8');
    res.end(fileRouter.controller.uploadManager.toString());
});

//list the private files
fileRouter.post('/flat-admin/file/list/private', function (req, res) {
    var privateItems = fileRouter.controller.uploadManager.findManyByParam('private', true);
    var str = '[';
    privateItems.forEach(function (item) {
        str += item.toString();
    });
    str += ']';
    //str = str.replace(/,(?=[^,]*$)/, '');
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(str);
});

//remove a file
fileRouter.post('/flat-admin/file/remove', function (req, res) {
    var filename = req.body.name;
    fileRouter.controller.uploadManager.removeByParam('fileName', filename, function (err, itemArr) {
        if (err) {
            (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
        } else {
            fileRouter.controller.uploader.removeFile(itemArr[0].get('private'), itemArr[0].get('fileName'), function (err, done) {
                if (err) {
                    (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
                } else {
                    (0, _helpersShowSuccessJs2['default'])(req, res, 'file deleted', 200);
                }
            });
        }
    });
});

//get the upload dirs
fileRouter.post('/flat-admin/file/dirs', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf8');
    var obj = {};
    obj['private'] = fileRouter.controller.uploader.privateDir;
    obj['public'] = fileRouter.controller.uploader.publicDir;
    res.end(JSON.stringify(obj));
});

fileRouter.always(function (req, res) {
    (0, _helpersShowErrorJs2['default'])(req, res, new Error("Not Found"), 404);
});

exports['default'] = fileRouter;
module.exports = exports['default'];