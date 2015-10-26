
"use strict"

import fs from 'fs';

/**
 * This class handels the uploaded/files io
 */
export default class uploadedFiles {

    /**
     * @constructor
     * @param {string} publicDir - the public file dir
     * @param {string} privateDir - the private dir
     */
    constructor(publicDir,privateDir){

        /**
         * The public uploaded file dir
         * @type {string}
         */
        this._publicDir = publicDir;

        //make sure the directory exists
        if(!fs.existsSync(this._publicDir)){
            fs.mkdirSync(this._publicDir);
        }

        /**
         * The private uploaded file dir
         * @type {string}
         */
        this._privateDir = privateDir;

        //make sure the directory exists
        if(!fs.existsSync(this._privateDir)){
            fs.mkdirSync(this._privateDir);
        }
    }

    /**
     * Get the private dir
     * @return {string} the private dir
     */
    get privateDir(){
        return this._privateDir;
    }

    /**
     * Set the private dir
     * @param {string} dir - the new private dir
     */
    set privateDir(dir){
        this._privateDir = dir;
    }

    /**
     * Get the public dir
     * @return {string} the public dir
     */
    get publicDir(){
        return this._publicDir;
    }

    /**
     * Set the public dir
     * @param {string} dir - the new public dir
     */
    set publicDir(dir){
        this._publicDir = dir;
    }

    /**
     * Get the direcotry of the file
     * @param {boolean} priv - is the file private
     * @return {string} the directory
     */
    getDir(priv){
        if(priv === true){
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
    writeFile(priv,name,mime,fileData,callback){
        var dir = this.getDir(priv);
        var encoding = uploadedFiles.determineEncoding(mime);
        fs.writeFile(dir+name,fileData,encoding,function(err){
            if(err){
                return callback(err,null);
            }
            return callback(null,true);
        });
    }

    /**
     * Read a file from disk
     * @param {string} file - the file to be loaded
     * @param {function(err:error,mime:string,fileStr:string)} callback - the callback function returns error or the file string
     * @return {function} the callback function
     */
    readFile(file,callback){
        var mime = uploadedFiles.mimeType(file);
        var encoding = uploadedFiles.determineEncoding(mime);
        fs.readFile(file,encoding,function(err,mime,fileStr){
            if(err){
                return callback(err,null,null);
            }
            return callback(err,mime,fileStr);
        });
    }

    /**
     * Remove a file from disk
     * @param {boolean} priv - is the file private or not
     * @param {string} name - the name of the file
     * @param {function(err:error,done:boolean)} callback - done is true if the file was deleted
     * @return {function} the callback
     */
    removeFile(priv,name,callback){
        var dir = this.getDir(priv);
        fs.unlink(dir+name,function(err){
            if(err){
                return callback(err,null);
            }
            return callback(null,true);
        });
    }

    /**
     * Look up a mime type
     * @param {string} filename - the file name
     * @return {string} the mime type
     */
    static mimeType(filename){
        var mimeTypes = 
        {
          'a'      : 'application/octet-stream',
          'ai'     : 'application/postscript',
          'aif'    : 'audio/x-aiff',
          'aifc'   : 'audio/x-aiff',
          'aiff'   : 'audio/x-aiff',
          'au'     : 'audio/basic',
          'avi'    : 'video/x-msvideo',
          'bat'    : 'text/plain',
          'bin'    : 'application/octet-stream',
          'bmp'    : 'image/x-ms-bmp',
          'c'      : 'text/plain',
          'cdf'    : 'application/x-cdf',
          'csh'    : 'application/x-csh',
          'css'    : 'text/css',
          'dll'    : 'application/octet-stream',
          'doc'    : 'application/msword',
          'dot'    : 'application/msword',
          'dvi'    : 'application/x-dvi',
          'eml'    : 'message/rfc822',
          'eps'    : 'application/postscript',
          'etx'    : 'text/x-setext',
          'exe'    : 'application/octet-stream',
          'gif'    : 'image/gif',
          'gtar'   : 'application/x-gtar',
          'h'      : 'text/plain',
          'hdf'    : 'application/x-hdf',
          'htm'    : 'text/html',
          'html'   : 'text/html',
          'jpe'    : 'image/jpeg',
          'jpeg'   : 'image/jpeg',
          'jpg'    : 'image/jpeg',
          'js'     : 'application/x-javascript',
          'ksh'    : 'text/plain',
          'latex'  : 'application/x-latex',
          'm1v'    : 'video/mpeg',
          'man'    : 'application/x-troff-man',
          'me'     : 'application/x-troff-me',
          'mht'    : 'message/rfc822',
          'mhtml'  : 'message/rfc822',
          'mif'    : 'application/x-mif',
          'mov'    : 'video/quicktime',
          'movie'  : 'video/x-sgi-movie',
          'mp2'    : 'audio/mpeg',
          'mp3'    : 'audio/mpeg',
          'mp4'    : 'video/mp4',
          'mpa'    : 'video/mpeg',
          'mpe'    : 'video/mpeg',
          'mpeg'   : 'video/mpeg',
          'mpg'    : 'video/mpeg',
          'ms'     : 'application/x-troff-ms',
          'nc'     : 'application/x-netcdf',
          'nws'    : 'message/rfc822',
          'o'      : 'application/octet-stream',
          'obj'    : 'application/octet-stream',
          'oda'    : 'application/oda',
          'pbm'    : 'image/x-portable-bitmap',
          'pdf'    : 'application/pdf',
          'pfx'    : 'application/x-pkcs12',
          'pgm'    : 'image/x-portable-graymap',
          'png'    : 'image/png',
          'pnm'    : 'image/x-portable-anymap',
          'pot'    : 'application/vnd.ms-powerpoint',
          'ppa'    : 'application/vnd.ms-powerpoint',
          'ppm'    : 'image/x-portable-pixmap',
          'pps'    : 'application/vnd.ms-powerpoint',
          'ppt'    : 'application/vnd.ms-powerpoint',
          'pptx'    : 'application/vnd.ms-powerpoint',
          'ps'     : 'application/postscript',
          'pwz'    : 'application/vnd.ms-powerpoint',
          'py'     : 'text/x-python',
          'pyc'    : 'application/x-python-code',
          'pyo'    : 'application/x-python-code',
          'qt'     : 'video/quicktime',
          'ra'     : 'audio/x-pn-realaudio',
          'ram'    : 'application/x-pn-realaudio',
          'ras'    : 'image/x-cmu-raster',
          'rdf'    : 'application/xml',
          'rgb'    : 'image/x-rgb',
          'roff'   : 'application/x-troff',
          'rtx'    : 'text/richtext',
          'sgm'    : 'text/x-sgml',
          'sgml'   : 'text/x-sgml',
          'sh'     : 'application/x-sh',
          'shar'   : 'application/x-shar',
          'snd'    : 'audio/basic',
          'so'     : 'application/octet-stream',
          'src'    : 'application/x-wais-source',
          'swf'    : 'application/x-shockwave-flash',
          't'      : 'application/x-troff',
          'tar'    : 'application/x-tar',
          'tcl'    : 'application/x-tcl',
          'tex'    : 'application/x-tex',
          'texi'   : 'application/x-texinfo',
          'texinfo': 'application/x-texinfo',
          'tif'    : 'image/tiff',
          'tiff'   : 'image/tiff',
          'tr'     : 'application/x-troff',
          'tsv'    : 'text/tab-separated-values',
          'txt'    : 'text/plain',
          'tpl'    : 'text/html',
          'ustar'  : 'application/x-ustar',
          'vcf'    : 'text/x-vcard',
          'wav'    : 'audio/x-wav',
          'wiz'    : 'application/msword',
          'wsdl'   : 'application/xml',
          'xbm'    : 'image/x-xbitmap',
          'xlb'    : 'application/vnd.ms-excel',
          'xls'    : 'application/vnd.ms-excel',
          'xlsx'    : 'application/vnd.ms-excel',
          'xml'    : 'text/xml',
          'xpdl'   : 'application/xml',
          'xpm'    : 'image/x-xpixmap',
          'xsl'    : 'application/xml',
          'xwd'    : 'image/x-xwindowdump',
          'zip'    : 'application/zip'
        };
        var default_mime = 'application/octet-stream';
        var ext = filename.split('.').pop();
        for(var key in mimeTypes){
            if(ext === key){
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
    static determineEncoding(mime){
        var encoding = 'binary';
        var textTypes = ['text','json','javascript'];
        for(let i=0,l=textTypes.length; i<l; i++){
            if(mime.indexOf(textTypes[i]) > -1){
                encoding = 'utf-8';
                break;
            }
        }
        return encoding;
    }

}
