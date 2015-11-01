
"use strict"

import fs from 'fs';

/**
 * Object list of the mime types
 * @type {array}
 * @property {string} ext - the file extension
 * @property {string} mime - the mime type
 */
var mimeTypes = fs.readFileSync('./flat-config/mime.json','utf8');

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

        try {
        //check that the dir exists if not create
            let stat = fs.lstatSync(this._publicDir);
        } catch(err){
            fs.mkdirSync(this.dir);
        }
        /**
         * The private uploaded file dir
         * @type {string}
         */
        this._privateDir = privateDir;

        try {
        //check that the dir exists if not create
            let stat = fs.lstatSync(this._privateDir);
        } catch(err){
            fs.mkdirSync(this.dir);
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
        fs.writeFile(dir+name,fileData,encoding,(err)=>{
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
        fs.readFile(file,encoding,(err,fileStr)=>{
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
        fs.unlink(dir+name,(err)=>{
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
