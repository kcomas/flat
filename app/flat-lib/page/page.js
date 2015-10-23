
"use strict"

import item from '../helpers/items/item.js';

/**
 * This class manages the saving,loading from file and rendering from memory
 * @extend {item}
 */
export default class page extends item {

    /**
     * Create a new page
     * @overide
     * @param {string} permalink - the link of the page
     * @param {object} def - the default data to be passed into the page object as key:value
     * @param {string} template - the default template
     * @param {function(err:err,done:boolean)} callback - returns done true if created
     * @return {function} the callback function
     */
    create(permalink,def,template,callback){
        var self = this;
        this.genId(function(err,done){
            if(err){
                return callback(err,null);
            }
            self.data.permalink = permalink;
            self.data.def = def;
            self.data.cache = cache;
            self.data.dateCreated = new Date();
            self.data.template = template;
            self.save(function(err,done){
                return callback(err,done);
            });
        });
    }


}
