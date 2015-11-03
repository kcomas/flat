
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

var _flatLibHelpersPageRenderJs = require('../../flat-lib/helpers/pageRender.js');

var _flatLibHelpersPageRenderJs2 = _interopRequireDefault(_flatLibHelpersPageRenderJs);

var pageRouter = new _flatLibServerRouterJs2['default']();

//list all of the pages
pageRouter.post('/flat-admin/page/list', function (req, res) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json; charset=utf8');
    res.end(pageRouter.controller.pageManager.toString());
});

//delete page
pageRouter.post('/flat-admin/page/remove', function (req, res) {
    pageRouter.controller.pageManager.removeByParam('permalink', req.body.permalink, function (err, done) {
        if (err) {
            (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
        } else {
            //delete the cached page if it exists
            pageRouter.controller.cacheManager.removeByParam('permalink', req.body.permalink, function (err, done) {
                (0, _helpersShowSuccessJs2['default'])(req, res, "item deleted", 200);
            });
        }
    });
});

//add update a page
pageRouter.post('/flat-admin/page/upsert', function (req, res) {
    var permalink = req.body.permalink;
    var def = req.body.def;
    var template = req.body.template;
    var page = pageRouter.controller.pageManager.findByParam('permalink', permalink);
    if (page === null) {
        pageRouter.controller.pageManager.create(permalink, def, template, function (err, done) {
            if (err) {
                (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
            } else {
                (0, _helpersShowSuccessJs2['default'])(req, res, 'update/saved', 200);
            }
        });
    } else {
        page.upsert({ 'def': def, 'template': template }, function (err, done) {
            if (err) {
                (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
            } else {
                (0, _helpersShowSuccessJs2['default'])(req, res, 'update/saved', 200);
            }
        });
    }
});

//create a page and add it to the cache
pageRouter.post('/flat-admin/page/render', function (req, res) {
    var permalink = req.body.permalink;
    var page = pageRouter.controller.pageManager.findByParam('permalink', permalink);
    if (page === null) {
        (0, _helpersShowErrorJs2['default'])(req, res, new Error('No Page Found'), 500);
    } else {
        //find the page template
        var template = pageRouter.controller.templateManager.findByParam('name', page.get('template'));
        if (template === null) {
            (0, _helpersShowErrorJs2['default'])(req, res, new Error('Page Template Not Found'), 500);
        } else {
            var cache = pageRouter.controller.cacheManager.findByParam('permalink', permalink);
            var fileStr = (0, _flatLibHelpersPageRenderJs2['default'])(page.get('def'), template.get('layout'));
            if (cache === null) {
                //create
                pageRouter.controller.cacheManager.create(permalink, fileStr, function (err, done) {
                    if (err) {
                        (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
                    } else {
                        (0, _helpersShowSuccessJs2['default'])(req, res, "Page Rendered", 200);
                    }
                });
            } else {
                //update
                cache.upsert({ 'fileStr': fileStr }, function (err, done) {
                    if (err) {
                        (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
                    } else {
                        (0, _helpersShowSuccessJs2['default'])(req, res, "Page Rendered", 200);
                    }
                });
            }
        }
    }
});

pageRouter.always(function (req, res) {
    (0, _helpersShowErrorJs2['default'])(req, res, new Error("Not Found"), 404);
});

exports['default'] = pageRouter;
module.exports = exports['default'];