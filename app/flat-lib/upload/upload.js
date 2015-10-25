
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
     * @param {string} name - the nice name of the file
     * @param {string} filename - the filename of the file
     * @param {boolean} priv - indicates if the file is private or not
     * @param {string} mime - the mime type
     * @param {function(err:error,done:boolean)} callback - done is true if the obj was created
     * @return {function} the callback function
     */
    create(name,filename,priv,mime,callback){
        console.dir(name);
        console.dir(filename);
        console.dir(priv);
        console.dir(mime);
        console.dir(callback);
        var self = this;
        this.genId(function(err,done){
            if(err){
                return callback(err,null);
            }
            self.data.name = name;
            self.data.fileName = filename;
            self.data.private = priv;
            self.data.mime = mime;
            self.data.dateCreated = new Date();
            self.save(function(err,done){
                return callback(err,done);
            });
        });
    }

}
