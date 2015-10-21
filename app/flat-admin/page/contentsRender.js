
"use strict"

import fs from 'fs';

/**
 * This function converts the contents into a single string to be added to the page
 * @param {string} dir - the directory of the content files
 * @param {array} contents - the array of the contents object as name:filename
 * @return {string} the contents rendered together
 */
export default function contentsRender(dir,contents){
    var rendered = '';
    contents.forEach(function(content){
        rendered += '<uib-tab heading="'+contnet.name+'">'+fs.readFileSync(dir+content.filename,'utf8')+'</uib-tab>';   
    });
    return rendered;
}
