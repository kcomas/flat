
"use strict"

import manager from '../helpers/items/manager.js';
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
        var tmp = new template(this.dir);
        tmp.create(name,layout,(err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.add(tmp);
            return callback(null,true);
        });
    }

    /**
     * Int all of the templates
     * @override
     */
    init(){
        var itemArr = this.subInt();
        itemArr.forEach((obj)=>{
            var newItem = new template(this.dir,obj.file,obj.data);
            this.add(newItem);
        });
    }

}
