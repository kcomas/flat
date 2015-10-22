
"use strict"

import manager from '../helpers/item/manager.js';
import template from './template.js';

/**
 * This class manages the templates
 * @extend {manager}
 */
export default class templateManager extends manager {

    /**
     * Create a new template and add to items
     * @override
     * @param {string} name - the name of the template
     * @param {object} layout - the layout of the template
     * @param {function(err:error,done:boolean)} callback - done is true if the template was created
     * @return {function} the callback function
     */
    create(name,layout,callback){
        var self = this;
        var tmp = new template(this.dir);
        tmp.create(name,layout,function(err,done){
            if(err){
                return callback(err,null);
            }
            self.add(tmp);
            return callback(null,true);
        });
    }

}
