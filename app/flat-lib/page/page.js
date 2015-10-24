
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
     * @property {string} name - the name of the string to replace
     * @property {string} type - the type of the string to replace text or html
     * @property {string} text - the text string
     * @property {string} html - the html string
     * @param {string} template - the default template name
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
            self.data.dateCreated = new Date();
            self.data.template = template;
            self.save(function(err,done){
                console.log('saving');
                return callback(err,done);
            });
        });
    }


}
