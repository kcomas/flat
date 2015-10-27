
"use strict"

import item from '../helpers/items/item.js';

/**
 * This class stores the templkates for the pages
 * @extends {item}
 */
export default class template extends item {

    /**
     * Create a new template
     * @overrride
     * @param {string} name - the name of the template
     * @param {string} layout - the layout of the template
     * @param {function(err:error,done:booelan)} callback - done is true if the template was created
     * @return {function} the callback function
     */
    create(name,layout,callback){
        this.genId((err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.data.name = name;
            this.data.layout = layout;
            this.data.dateCreated = new Date();
            this.save((err,done)=>{
                return callback(err,done);
            });
        });
    }

}
