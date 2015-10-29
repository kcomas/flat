
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
     * @property {string} html - the html string
     * @param {string} template - the default template name
     * @param {function(err:err,done:boolean)} callback - returns done true if created
     * @return {function} the callback function
     */
    create(permalink,def,template,callback){
        this.genId((err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.data.permalink = permalink;
            this.data.def = def;
            this.data.dateCreated = new Date();
            this.data.template = template;
            this.save(function(err,done){
                return callback(err,done);
            });
        });
    }

    

}
