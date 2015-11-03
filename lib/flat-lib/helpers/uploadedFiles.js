
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/**
 * Object list of the mime types
 * @type {array}
 * @property {string} ext - the file extension
 * @property {string} mime - the mime type
 */
var mimeTypes = _fs2['default'].readFileSync('./flat-config/mime.json', 'utf8');

/**
 * This class handels the uploaded/files io
 */

var uploadedFiles = (function () {

    /**
     * @constructor
     * @param {string} publicDir - the public file dir
     * @param {string} privateDir - the private dir
     */

    function uploadedFiles(publicDir, privateDir) {
        _classCallCheck(this, uploadedFiles);

        /**
         * The public uploaded file dir
         * @type {string}
         */
        this._publicDir = publicDir;

        try {
            //check that the dir exists if not create
            var stat = _fs2['default'].statSync(this._publicDir);
        } catch (err) {
            if (err.code === 'ENOENT') {
                _fs2['default'].mkdirSync(this._publicDir);
            } else {
                console.dir(err);
            }
        }
        /**
         * The private uploaded file dir
         * @type {string}
         */
        this._privateDir = privateDir;

        try {
            //check that the dir exists if not create
            var stat = _fs2['default'].statSync(this._privateDir);
        } catch (err) {
            if (err.code === 'ENOENT') {
                _fs2['default'].mkdirSync(this._privateDir);
            } else {
                console.dir(err);
            }
        }
    }

    /**
     * Get the private dir
     * @return {string} the private dir
     */

    _createClass(uploadedFiles, [{
        key: 'getDir',

        /**
         * Get the direcotry of the file
         * @param {boolean} priv - is the file private
         * @return {string} the directory
         */
        value: function getDir(priv) {
            if (priv === true) {
                var dir = this._privateDir;
            } else {
                var dir = this._publicDir;
            }
            return dir;
        }

        /**
         * Write a file to disk
         * @param {boolean} priv - if it is a public or private file
         * @param {string} name - the file name
         * @param {string} mime - the file encoding to use
         * @param {string} fileData - the file data
         * @param {function(err:err,done:boolean)} callback - done is true if the file was created
         * @returns {function} the callback function
         */
    }, {
        key: 'writeFile',
        value: function writeFile(priv, name, mime, fileData, callback) {
            var dir = this.getDir(priv);
            var encoding = uploadedFiles.determineEncoding(mime);
            _fs2['default'].writeFile(dir + name, fileData, encoding, function (err) {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, true);
            });
        }

        /**
         * Read a file from disk
         * @param {string} file - the file to be loaded
         * @param {function(err:error,mime:string,fileStr:string)} callback - the callback function returns error or the file string
         * @return {function} the callback function
         */
    }, {
        key: 'readFile',
        value: function readFile(file, callback) {
            var mime = uploadedFiles.mimeType(file);
            var encoding = uploadedFiles.determineEncoding(mime);
            _fs2['default'].readFile(file, encoding, function (err, fileStr) {
                if (err) {
                    return callback(err, null, null);
                }
                return callback(err, mime, fileStr);
            });
        }

        /**
         * Remove a file from disk
         * @param {boolean} priv - is the file private or not
         * @param {string} name - the name of the file
         * @param {function(err:error,done:boolean)} callback - done is true if the file was deleted
         * @return {function} the callback
         */
    }, {
        key: 'removeFile',
        value: function removeFile(priv, name, callback) {
            var dir = this.getDir(priv);
            _fs2['default'].unlink(dir + name, function (err) {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, true);
            });
        }

        /**
         * Look up a mime type
         * @param {string} filename - the file name
         * @return {string} the mime type
         */
    }, {
        key: 'privateDir',
        get: function get() {
            return this._privateDir;
        },

        /**
         * Set the private dir
         * @param {string} dir - the new private dir
         */
        set: function set(dir) {
            this._privateDir = dir;
        }

        /**
         * Get the public dir
         * @return {string} the public dir
         */
    }, {
        key: 'publicDir',
        get: function get() {
            return this._publicDir;
        },

        /**
         * Set the public dir
         * @param {string} dir - the new public dir
         */
        set: function set(dir) {
            this._publicDir = dir;
        }
    }], [{
        key: 'mimeType',
        value: function mimeType(filename) {
            var default_mime = 'application/octet-stream';
            var ext = filename.split('.').pop();
            for (var key in mimeTypes) {
                if (ext === key) {
                    default_mime = mimeTypes[key];
                    break;
                }
            }
            return default_mime;
        }

        /**
         * This function detrimes the file encoding to use when reading/writing files uploaded
         * @param {string} mime - the mime type
         * @return {string} the encoding to use
         */
    }, {
        key: 'determineEncoding',
        value: function determineEncoding(mime) {
            var encoding = 'binary';
            var textTypes = ['text', 'json', 'javascript'];
            for (var i = 0, l = textTypes.length; i < l; i++) {
                if (mime.indexOf(textTypes[i]) > -1) {
                    encoding = 'utf-8';
                    break;
                }
            }
            return encoding;
        }
    }]);

    return uploadedFiles;
})();

exports['default'] = uploadedFiles;
module.exports = exports['default'];