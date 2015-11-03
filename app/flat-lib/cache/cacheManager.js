
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
        newCache.create(permalink,fileStr,(err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.add(newCache);
            return callback(null,true);
        });
    }

    /**
     * Int all of the caches 
     * @override
     */
    init(){
        var itemArr = this.subInt();
        itemArr.forEach((obj)=>{
            var newItem = new cache(this.dir,obj.file,obj.data);
            this.add(newItem);
        });
    }

    /**
     * Retrive a certian number of items based
     * @param {number} start - the starting number in the loop
     * @param {number} total - the total number to collect
     * @return {string} the items collected as the filestr
     */
    getSelection(start,total){
        var ret = '';
        if(start === 1){
            start = 0;
        } else {
            start = ((start-1)*total)-1;
        }
        for(let i=start; i<total; i++){
            if(i === this.items.length){
                break;
            }
            ret += this.items[i].get('fileStr');
        }
        return ret;
    }   
    
}
