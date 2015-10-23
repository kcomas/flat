
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
     * @param {object} layout - the layout of the template
     * @param {function(err:error,done:booelan)} callback - done is true if the template was created
     * @return {function} the callback function
     */
    create(name,layout,callback){
        var self = this;
        this.genId(function(err,done){
            if(err){
                return callback(err,null);
            }
            self.data.name = name;
            self.data.layout = layout;
            self.data.dateCreated = new Date();
            self.save(function(err,done){
                return callback(err,done);
            });
        });
    }

}
