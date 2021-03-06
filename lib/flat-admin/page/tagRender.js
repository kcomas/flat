
"use strict";

/**
 * Conver the tag array into tags
 * @param {string} tag - the tag to be used for each object in the array
 * @param {boolean} selfClose - does the tag self close
 * @param {array} objArray - the array of obejcts as attr:value
 * @return {string} the rendered string of tags
 */
Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = tagRender;

function tagRender(tag, selfClose, objArray) {
    var render = '';
    try {
        objArray.forEach(function (obj) {
            render += '<' + tag;
            for (var key in obj) {
                render += ' ' + key + '="' + obj[key] + '"';
            }
            if (selfClose) {
                render += '/>';
            } else {
                render += '></' + tag + '>';
            }
        });
    } catch (err) {}
    return render;
}

module.exports = exports['default'];