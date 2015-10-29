
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
     * @param {string} permalink - the url of the cache
     * @param {string} fileStr - the string of the file
     * @param {function(err:error,done:boolean)} callback - done is true if the item was created
     * @return {function} the callback function
     */
    create(permalink,fileStr,callback){
        this.genId((err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.data.permalink = permalink
            this.data.fileStr = fileStr;
            this.data.dateCreated = new Date();
            this.save((err,done)=>{
                return callback(err,done);
            });
        });
    }



}
