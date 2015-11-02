
"use strict"

import blogReplace from './blogReplace.js';

/**
 * Function To Render a single blog page
 * @param {blog} blog - the blog class to pass in
 * @param {string} layout - the layout to use on the blog
 * @return {string} the rendered blog page
 */
export default function blogRender(blog,layout){

    //remove the blog tag
    layout = layout.replace('$$blog$$','').replace('$$/blog$$','');

    var toReplace = {
        '$$theTitle$$' : blog.get('title'),
        '$$theAuthor$$' : blog.get('author'),
        '$$theContent$$' : blog.get('content'),
        '$$theTags$$' : blog.get('tags').join(' '),
        '$$theDate$$' : blog.get('dateCreated')
    };
    return blogReplace(toReplace,layout);

}
