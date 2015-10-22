
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
     * @param {object} default - the default data to be passed into the page object as key:value
     * @param {string} template - the name of the template file
     * @param {function(err:err,done:boolean)} callback - returns done true if created
     * @return {function} the callback function
     */
    create(permalink,default,template,callback){
        var self=this;
        genId(function(err,done){
            if(err){
                return callback(err,null);
            }
            self.data.permalink = permalink;
            self.data.default = default;
            self.data.template = template;
            self.data.dateCreated = new Date();
            self.save(function(err,done){
                return callback(err,done);
            });
        });
    }


}
