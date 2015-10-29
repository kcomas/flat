
"use strict"

import manager from '../helpers/items/manager.js';
import page from './page.js';

/**
 * Manage the pages 
 * @extends {manager}
 */
export default class pageManager extends manager {

     /**
     * Create a new page
     * @overide
     * @param {string} permalink - the link of the page
     * @param {object} def - the default data to be passed into the page object as key:value
     * @param {string} template - the name of the template file
     * @param {function(err:err,done:boolean)} callback - returns done true if created
     * @return {function} the callback function
     */
    create(permalink,def,template,callback){
        var newPage = new page(this.dir);
        newPage.create(permalink,def,template,(err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.add(newPage);
            return callback(null,true);
        });

    }    

    /**
     * Int all of the pages
     * @override
     */
    init(){
        var itemArr = subInt();
        itemArr.forEach(obj){
            var newItem = new page(this.dir,obj.file,obj.data);
            this.add(newItem);
        });
    }

}
