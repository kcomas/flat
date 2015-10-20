
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
     * @return {function} 
     */
    create(){

    }

}
