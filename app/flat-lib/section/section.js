
"use strict"

import item from '../helpers/items/item.js';

/**
 * The section class for sections in pages(like widgets)
 * @extends {item}
 */
export default class section extends item {

    /**
     * Create a section
     * @override
     * @param {string} name - the name of the section
     * @param {string} layout - the json layout of the section
     * @param {function(err:error,done:boolean)} callback - the callback function done is true if the section is created
     * @return {function} the callback function
     */
    create(name,layout,callback){
        //generate id
        this.genId((err,done)=>{
            if(err){
                return callback(err,done);
            }
            this.data.name = name;
            this.data.layout = layout;
            this.dateCreated = new Date();
            this.save(function(err,done){
                return callback(err,done);
            });
        });
    }


}
