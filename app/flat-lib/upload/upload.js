
"use strict"

import item from '../helpers/items/item.js';

/**
 * This class contains a single upload
 * @extends {item}
 */
export default class upload extends item {

    /**
     * Create a new file upload object
     * @override
     * @param {string} filename - the filename of the file
     * @param {boolean} priv - indicates if the file is private or not
     * @param {string} mime - the mime type
     * @param {function(err:error,done:boolean)} callback - done is true if the obj was created
     * @return {function} the callback function
     */
    create(filename,priv,mime,callback){
        this.genId((err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.data.fileName = filename;
            this.data.private = priv;
            this.data.mime = mime;
            this.data.dateCreated = new Date();
            this.save((err,done)=>{
                return callback(err,done);
            });
        });
    }

}
