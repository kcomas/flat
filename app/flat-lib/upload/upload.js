
"use strict"

import item from '../helpers/items/item.js';
import mime from '../helpers/mime.js';

/**
 * This class contains a single upload
 * @extends {item}
 */
export default class upload extends item {

    /**
     * Create a new file upload object
     * @override
     * @param {string} name - the nice name of the file
     * @param {string} filename - the filename of the file
     * @param {boolean} priv - indicates if the file is private or not
     * @param {function(err:error,done:boolean)} callback - done is true if the obj was created
     * @return {function} the callback function
     */
    create(name,filename,priv,callback){
        var self = this;
        this.genId(err,done){
            if(err){
                return callback(err,null);
            }
            self.data.name = name;
            self.data.fileName = filename;
            self.data.private = priv;
            self.data.mime = mime(filename);
            self.data.dateCreated = new Date();
            self.save(function(err,done){
                return callback(err,done);
            });
        }
    }

}
