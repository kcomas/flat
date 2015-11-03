
"use strict"

import blogReplace from './blogReplace.js';

/**
 * Function To Render a single blog page
 * @param {blog} blog - the blog class to pass in
 * @param {string} layout - the layout to use on the blog
 * @param {string} blogHtml - the blog html
 * @param {string} blogCacheHtml - the blog list cache html
 * @param {function(cacheString:string,cacheListString:string)} callback - returns the cachestring and the list cache string
 * @return {function} the callback function
 */
export default function blogRender(blog,layout,blogHtml,blogCacheHtml,callback){

    var toReplace = {
        '$$theTitle$$' : blog.get('title'),
        '$$theAuthor$$' : blog.get('author'),
        '$$theContent$$' : blog.get('content'),
        '$$theTags$$' : blog.get('tags').join(' '),
        '$$theDate$$' : blog.get('dateCreated')
    };
    let layout2 = layout;
    let str = blogReplace(toReplace,blogHtml);
    toReplace['$$theLink'] = blog.get('permalink');
    let st2 = blogReplace(toReplace,blogCacheHtml);
    return callback(layout.replace('<BLOGDATA/>',str).replace('<BLOGLIST/>',''),layout2.replace('<BLOGLIST/>',str2).replace('<BLOGDATA/>',''));
}
