
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = pageRender;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/**
 * This function builds the html files for the admin page
 * @param {string} dir - the directory of the cache files
 * @param {string} permalink - the filename/permalink of the page
 * @param {array} tags - the array of tag objets as key:content
 * @param {array} files - the array of files objects as name:filename to render
 * @return {string} - the string of the file generated
 */

function pageRender(dir, permalink, tags, files) {
    var file = dir + permalink.replace('/', '~') + '.html';
    var loadedFiles = [];
    files.forEach(function (file) {
        for (var key in file) {
            try {
                loadedFiles.push({ name: key, str: _fs2['default'].readFileSync(file[key], 'utf8') });
            } catch (err) {
                console.log(err);
            }
        }
    });
    var container = loadedFiles.shift().str;
    loadedFiles.forEach(function (file2) {
        try {
            var reg = new RegExp('%' + file2.name + '%', 'g');
            container = container.replace(reg, file2.str);
        } catch (err) {
            console.log(err);
        }
    });
    tags.forEach(function (tag) {
        for (var key in tag) {
            try {
                var reg = new RegExp('%' + key + '%', 'g');
                container = container.replace(reg, tag[key]);
            } catch (err) {
                console.log(err);
            }
        }
    });
    try {
        _fs2['default'].writeFileSync(file, container, 'utf8');
    } catch (err) {
        console.log(err);
    }
    return container;
}

module.exports = exports['default'];