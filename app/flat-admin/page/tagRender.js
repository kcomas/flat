
"use strict"

/**
 * Conver the tag array into tags
 * @param {string} tag - the tag to be used for each object in the array
 * @param {boolean} selfClose - does the tag self close
 * @param {array} objArray - the array of obejcts as attr:value
 * @return {string} the rendered string of tags
 */
export default function tagRender(tag,selfClose,objArray){
    var render = '';
    console.dir(objArray);
    objArray.forEach(function(obj){
        render += '<'+tag;
        for(let key in obj){
            render += ' '+key+'="'+obj.key+'"';
        }
        if(selfClose){
            render += '/>';
        } else {
            render += '></'+tag+'>';
        }
    });
    return render;
}
