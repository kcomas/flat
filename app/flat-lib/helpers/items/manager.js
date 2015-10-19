
"use strict"

import fs from 'fs';

/**
 * This class is used to manage all of the items in an array
 */
export default class manager {

    /**
     * @constructor
     * @param {string} dir - the directory of the items
     */
    constructor(dir){

        /**
         * The directory of the items
         * @type {string}
         */
        this.dir = dir;

        /**
         * The array of items
         * @type {array}
         */
        this.items = [];

    }

    /**
     * Get the directory
     * @return {string} the directory of the items
     */
    get dir(){
        return this.dir;
    }

    /**
     * Load all of the items from file sync use as an init function
     */
    init(){
        var files = fs.readDirSync(this.dir);
        var self = this;
        files.forEach(function(file){
            var data = fs.readFileSync(self.dir+file,'utf8');
            try {
                data = JSON.parse(data);
                self.items.push(data);
            } catch(err){

            }
        });
    }

    /**
     * Find an item by id
     * @return {item} the matching item or null if not found
     */
    findById(id){
        item = null;
        for(let i=0,length=this.items.length; i<length; i++){
            if(this.item.id === id){
                item = this.item;
                break;
            }
        }
        return item;
    }

}
