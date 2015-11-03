
"use strict"

import blogReplace from './blogReplace.js';

/**
 * Function To Render a single blog page
 * @param {blog} blog - the blog class to pass in
 * @param {string} layout - the layout to use on the blog
 * @param {string} blogHtml - the blog html
 * @return {string} the rendered blog page
 */
export default function blogRender(blog,layout,blogHtml){

    var toReplace = {
        '$$theTitle$$' : blog.get('title'),
        '$$theAuthor$$' : blog.get('author'),
        '$$theContent$$' : blog.get('content'),
        '$$theTags$$' : blog.get('tags').join(' '),
        '$$theDate$$' : blog.get('dateCreated')
    };
    let str = blogReplace(toReplace,blogHtml);
    return layout.replace('<BLOGDATA/>',str);
}
