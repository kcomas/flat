
"use strict"

import fs from 'fs';

/**
 * Write a file to disk
 * @param {string} dir - the file dir
 * @param {string} name - the file name
 * @param {string} fileData - the file data
 * @param {function(err:err,done:boolean)} callback - done is true if the file was created
 * @returns {function} the callback function
 */
export default function writeFile(dir,name,fileData,callback){
    var buf = new Buffer(fileData);
    fs.writeFile(dir+name,buf,function(err){
        if(err){
            return callback(err,null);
        }
        return callback(null,true);
    });
}
