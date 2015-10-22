
"use strict"

import manager from '../helpers/items/manager.js';
import page from './page.js';

/**
 * Manage the pages 
 * @extends {manager}
 */
export default class pageManager {

     /**
     * Create a new page
     * @overide
     * @param {string} permalink - the link of the page
     * @param {object} def - the default data to be passed into the page object as key:value
     * @param {string} template - the name of the template file
     * @param {function(err:err,done:boolean)} callback - returns done true if created
     * @return {function} the callback function
     */
    create(permalink,def,template,callback){
        var self = this;
        var page = new page(permalink,def,template,function(err,done){
            if(err){
                return callback(err,null);
            }
            self.add(page);
            return callback(null,true);
        });

    }    



}
