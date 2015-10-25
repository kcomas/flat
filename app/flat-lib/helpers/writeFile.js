
"use strict"

import fs from 'fs';
import determineEncoding from './determineEncoding.js';

/**
 * Write a file to disk
 * @param {string} dir - the file dir
 * @param {string} name - the file name
 * @param {string} mime - the file encoding to use
 * @param {string} fileData - the file data
 * @param {function(err:err,done:boolean)} callback - done is true if the file was created
 * @returns {function} the callback function
 */
export default function writeFile(dir,name,mime,fileData,callback){
    var encoding = determineEncoding(mime);
    fs.writeFile(dir+name,fileData,encoding,function(err){
        if(err){
            return callback(err,null);
        }
        return callback(null,true);
    });
}
