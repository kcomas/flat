
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
     * @param {string} name - the name of the uplaod
     * @param {string} filename - the filename
     * @param {boolean} priv - indicates if the file is private or not
     * @param {function(err:err,done:boolean)} callback - done is true if the obj was created
     * @return {function} the callback function
     */
    create(name,filename,priv,callback){
        var up = new upload(this.dir);
        var self = this;
        up.create(name,filename,priv,function(err,done){
            if(err){
                return callback(err,null);
            }
            self.add(up);
            return callback(null,true);
        });
    }

}
