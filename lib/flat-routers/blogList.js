
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _flatLibServerRouterJs = require('../flat-lib/server/router.js');

var _flatLibServerRouterJs2 = _interopRequireDefault(_flatLibServerRouterJs);

var blogListRouter = new _flatLibServerRouterJs2['default']();

blogListRouter.use(function (req, res, next) {
    var page = req.query.page;
    try {
        page = parseInt(page);
    } catch (err) {
        page = 0;
    }
    if (isNaN(page)) {
        page = 0;
    }
    var total = blogListRouter.controller.blogTemplate.numPerPage;
    var blogStr = blogListRouter.controller.blogListCache.getSelection(page, total);
    //grab the blog template
    var blogTemplate = blogListRouter.controller.blogTemplate.cache.replace('<BLOGDATA/>', '');
    blogTemplate = blogTemplate.replace('<BLOGLIST/>', blogStr);
    res.statusCode = 200;
    res.setHeader('content-type', 'text/html; chartset=utf-8');
    res.end(blogTemplate);
});

blogListRouter.always(function (req, res) {
    res.statusCode = 404;
    res.setHeader('content-type', 'text/html; chartset=utf-8');
    res.end('<h1>Blog List 404</h1>');
});

exports['default'] = blogListRouter;
module.exports = exports['default'];