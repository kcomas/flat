
"use strict"

import manager from '../helpers/items/manager.js';
import section from './section.js';

/**
 * This class manages all of the sections of the site
 * @extends {manager}
 */
export default class sectionManager extends manager {

    /**
     * Add a section to the manager
     * @override
     * @param {string} name - the name of the section
     * @param {string} layout - the layout of the section
     * @param {function(err:error,done:boolean)} callback - returns done true if the section was sucessfully created
     * @return {function} the callback function
     */
    create(name,layout,callback){
        var sect = new section(this.dir);
        sect.create(name,layout,(err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.add(sect);
            return callback(null,true);
        });
    }

    /**
     * Int all of the sections
     * @override
     */
    init(){
        var itemArr = subInt();
        itemArr.forEach(obj){
            var newItem = new section(this.dir,obj.file,obj.data);
            this.add(newItem);
        });
    }

}
