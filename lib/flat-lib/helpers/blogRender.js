
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = blogRender;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _blogReplaceJs = require('./blogReplace.js');

var _blogReplaceJs2 = _interopRequireDefault(_blogReplaceJs);

/**
 * Function To Render a single blog page
 * @param {blog} blog - the blog class to pass in
 * @param {string} layout - the layout to use on the blog
 * @param {string} blogHtml - the blog html
 * @param {string} blogCacheHtml - the blog list cache html
 * @param {function(cacheString:string,cacheListString:string)} callback - returns the cachestring and the list cache string
 * @return {function} the callback function
 */

function blogRender(blog, layout, blogHtml, blogCacheHtml, callback) {

    var toReplace = {
        '$$theTitle$$': blog.get('title'),
        '$$theAuthor$$': blog.get('author'),
        '$$theContent$$': blog.get('content'),
        '$$theTags$$': blog.get('tags').join(' '),
        '$$theDate$$': blog.get('dateCreated')
    };
    var layout2 = layout;
    var str = (0, _blogReplaceJs2['default'])(toReplace, blogHtml);
    toReplace['$$theLink$$'] = '/blog' + blog.get('permalink');
    var str2 = (0, _blogReplaceJs2['default'])(toReplace, blogCacheHtml);
    return callback(layout.replace('<BLOGDATA/>', str).replace('<BLOGLIST/>', ''), layout2.replace('<BLOGLIST/>', str2).replace('<BLOGDATA/>', ''));
}

module.exports = exports['default'];