
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _flatLibServerRouterJs = require('../flat-lib/server/router.js');

var _flatLibServerRouterJs2 = _interopRequireDefault(_flatLibServerRouterJs);

var blogRouter = new _flatLibServerRouterJs2['default']();

blogRouter.use(function (req, res, next) {
    //find the blog or next
    var newUrl = req.url.replace('/blog', '');
    var blogCache = blogRouter.controller.blogCache.findByParam('permalink', newUrl);
    if (blogCache !== null) {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/html; charset=utf-8');
        res.end(blogCache.get('fileStr'));
    } else {
        next();
    }
});

blogRouter.always(function (req, res) {
    res.statusCode = 404;
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.end('<h1>Blog 404</h1>');
});

exports['default'] = blogRouter;
module.exports = exports['default'];