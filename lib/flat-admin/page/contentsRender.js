
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = contentsRender;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/**
 * This function converts the contents into a single string to be added to the page
 * @param {string} dir - the directory of the content files
 * @param {array} contents - the array of the contents object as name:filename
 * @return {string} the contents rendered together
 */

function contentsRender(dir, contents) {
    var rendered = '';
    contents.forEach(function (content) {
        try {
            rendered += '<uib-tab heading="' + content.name + '" >' + _fs2['default'].readFileSync(dir + content.filename, 'utf8') + '</uib-tab>';
        } catch (err) {
            console.log(err);
        }
    });
    return rendered;
}

module.exports = exports['default'];