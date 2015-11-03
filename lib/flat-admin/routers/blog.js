
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

var _flatLibHelpersBlogRenderJs = require('../../flat-lib/helpers/blogRender.js');

var _flatLibHelpersBlogRenderJs2 = _interopRequireDefault(_flatLibHelpersBlogRenderJs);

var blogRouter = new _flatLibServerRouterJs2['default']();

//list the blogs
blogRouter.post('/flat-admin/blog/list', function (req, res) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json; charset=utf8');
    res.end(blogRouter.controller.blogManager.toString());
});

//add update a blog
blogRouter.post('/flat-admin/blog/upsert', function (req, res) {
    var name = req.body.name;
    var title = req.body.title;
    var author = req.user.get('username');
    var content = req.body.content;
    var tags = req.body.tags || [];
    var permalink = req.body.permalink;
    var blog = blogRouter.controller.blogManager.findByParam('permalink', permalink);
    if (blog === null) {
        //create a new blog
        blogRouter.controller.blogManager.create(name, title, author, content, tags, function (err, done) {
            if (err) {
                (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
                return;
            }
            (0, _helpersShowSuccessJs2['default'])(req, res, 'Blog Created', 200);
        });
    } else {
        //update existing
        blog.upsert({ 'title': title, 'content': content, 'tags': tags }, function (err, done) {
            if (err) {
                (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
                return;
            }
            (0, _helpersShowSuccessJs2['default'])(req, res, 'Blog Updated', 200);
        });
    }
});

//remove a blog
blogRouter.post('/flat-admin/blog/remove', function (req, res) {
    var permalink = req.body.permalink;
    blogRouter.controller.blogManager.removeByParam('permalink', permalink, function (err, done) {
        if (err) {
            (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
            return;
        }
        //delete the cached page if it exists
        blogRouter.controller.blogCache.removeByParam('permalink', permalink, function (err, done) {
            //delete from the list cache
            blogRouter.controller.blogListCache.removeByParam('permalink', permalink, function (err, done) {
                (0, _helpersShowSuccessJs2['default'])(req, res, "item deleted", 200);
            });
        });
    });
});

//render a blog
blogRouter.post('/flat-admin/blog/render', function (req, res) {
    var permalink = req.body.permalink;
    var blog = blogRouter.controller.blogManager.findByParam('permalink', permalink);
    if (blog === null) {
        (0, _helpersShowErrorJs2['default'])(req, res, new Error('No Blog Found'), 500);
        return;
    }
    var cache = blogRouter.controller.blogCache.findByParam('permalink', permalink);
    var listCache = blogRouter.controller.blogListCache.findByParam('permalink', permalink);
    (0, _flatLibHelpersBlogRenderJs2['default'])(blog, blogRouter.controller.blogTemplate.cache, blogRouter.controller.blogTemplate.blogHtml, blogRouter.controller.blogTemplate.blogListHtml, function (cacheStr, listCacheStr) {
        if (cache === null && listCache === null) {
            //create
            blogRouter.controller.blogCache.create(permalink, cacheStr, function (err, done) {
                if (err) {
                    (0, _helpersShowErrorJs2['default'])(req, res, new Error('Failed To Create'), 500);
                    return;
                }
                blogRouter.controller.blogListCache.create(permalink, listCacheStr, function (err, done) {
                    if (err) {
                        (0, _helpersShowErrorJs2['default'])(req, res, new Error('Falied To Create List Cache'), 500);
                        return;
                    }
                    (0, _helpersShowSuccessJs2['default'])(req, res, 'Blog Cache Created', 200);
                });
            });
        } else {
            //update
            cache.upsert({ 'fileStr': cacheStr }, function (err, done) {
                if (err) {
                    (0, _helpersShowErrorJs2['default'])(req, res, new Error('Failed To Update'), 500);
                    return;
                }
                listCache.upsert({ 'fileStr': listCacheStr }, function (err, done) {
                    if (err) {
                        (0, _helpersShowErrorJs2['default'])(req, res, new Error('Failed To Update List Cache'), 500);
                        return;
                    }
                    (0, _helpersShowSuccessJs2['default'])(req, res, 'Blog Updated', 200);
                });
            });
        }
    });
});

//set the blog cache
blogRouter.post('/flat-admin/blog/blogTemplate/cache', function (req, res) {
    var permalink = req.body.permalink;
    var cache = blogRouter.controller.cacheManager.findByParam('permalink', permalink);
    if (cache === null) {
        (0, _helpersShowErrorJs2['default'])(req, res, new Error('No Cache Found'), 500);
        return;
    }
    blogRouter.controller.blogTemplate.cache = cache.get('fileStr');
    (0, _helpersShowSuccessJs2['default'])(req, res, 'Blog Cache Set', 200);
});

//update the blog list template
blogRouter.post('/flat-admin/blog/blogTemplate/set', function (req, res) {
    var numPerPage = parseInt(req.body.numPerPage);
    blogRouter.controller.blogTemplate.numPerPage = numPerPage;
    (0, _helpersShowSuccessJs2['default'])(req, res, 'Blog List Template Set', 200);
});

//get the current blog template information
blogRouter.post('/flat-admin/blog/blogTemplate/get', function (req, res) {
    var obj = {
        'numPerPage': blogRouter.controller.blogTemplate.numPerPage,
        'cache': blogRouter.controller.blogTemplate.cache
    };
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(obj));
});

blogRouter.always(function (req, res) {
    (0, _helpersShowErrorJs2['default'])(req, res, new Error("Not Found"), 404);
});

exports['default'] = blogRouter;
module.exports = exports['default'];