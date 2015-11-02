
"use strict"

import child from 'child_process';
var exec = child.exec;

/**
 * This file uses child process to tail files
 * @param {string} file - the file to tail
 * @param {number} lines - the number of lines to tail
 * @param {function(err:error,file:string)} callback - returns the tailed file
 * @return {function} the callback function
 */
export default function tail(file,lines,callback){
    var cmd = 'tail -n ' + lines + ' ' + file;
    exec(cmd,(error,stdout,stderr)=>{
        if(error){
            return callback(error,null);
        }
        return callback(null,stdout);
    });
}
