
"use strict"

import manager from '../helpers/items/manager.js';
import upload from './upload.js';

/**
 * Manages all of the uploads
 * @extends {item} 
 */
export default class uploadManager extends manager {

    /**
     * Create a new upload item
     * @override
     * @param {string} filename - the filename
     * @param {boolean} priv - indicates if the file is private or not
     * @param {string} mime - the mime type
     * @param {function(err:err,done:boolean)} callback - done is true if the obj was created
     * @return {function} the callback function
     */
    create(filename,priv,mime,callback){
        var up = new upload(this.dir);
        var self = this;
        up.create(filename,priv,mime,function(err,done){
            if(err){
                return callback(err,null);
            }
            self.add(up);
            return callback(null,true);
        });
    }

}
