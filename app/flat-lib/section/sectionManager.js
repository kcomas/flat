
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
        var self = this;
        sect.create(name,layout,function(err,done){
            if(err){
                return callback(err,null);
            }
            self.add(sect);
            return callback(null,true);
        });
    }



}