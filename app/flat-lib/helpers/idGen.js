
"use strict"

import crypto from 'crypto';

/**
 * Generate a random id used by users and sessions
 * @param {function(err:err,id:string)} callback - the function which returns the id or error if there was an issue with crypto
 * @return {function} the callback function
 */
export default function idGen(callback){
    crypto.randomBytes(5,function(err,bytes){
        if(err){
            return callback(err,null);
        }
        var id = crypto.createHash('sha512');
        id.update(bytes.toString('utf8'),'utf8');
        id.update(new Date().getTime(),'utf8');
        return callback(null,id.digest('hex'));
    });
}
