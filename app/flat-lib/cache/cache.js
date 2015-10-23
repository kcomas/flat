
"use strict"

import item from '../helpers/items/item.js';

/**
 * This class manages the rendered cache files
 * @extends {item}
 */
export default class cache extends item {

    /**
     * Create a new cache
     * @override
     * @param {string} parmalink - the url of the cache
     * @param {string} fileStr - the string of the file
     * @param {function(err:error,done:boolean)} callback - done is true if the item was created
     * @return {function} the callback function
     */
    create(parmalink,fileStr,callback){
        var self = this;
        this.genId(function(err,done){
            if(err){
                return callback(err,null);
            }
            self.name = name;
            self.fileStr = fileStr;
            self.dateCreated = new Date();
            self.save(function(err,done){
                return callback(err,done);
            });
        });
    }


}
