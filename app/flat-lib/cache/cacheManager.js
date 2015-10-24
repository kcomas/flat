
"use strict"

import manager from '../helpers/items/manager.js';
import cache from './cache.js';

/**
 * This is the file memory store of the generated pages
 * @extends {manager}
 */
export default class cacheManager extends manager {

    /**
     * Create a new cache
     * @override
     * @param {string} permalink - the permalink of the page
     * @param {string} fileStr - the string of the page
     * @param {function(err:error,done:boolean)} callback - the callback function
     * @return {function} the callback
     */
    create(permalink,fileStr,callback){
        var newCache = new cache(this.dir);
        var self = this;
        newCache.create(permalink,fileStr,function(err,done){
            if(err){
                return callback(err,null);
            }
            self.add(newCache);
            return callback(null,true);
        });
    }

}
