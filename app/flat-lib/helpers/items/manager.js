
"use strict"

import fs from 'fs';
import item from './item.js';

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

        //make sure the directory exists
        if(!fs.existsSync(this.dir)){
            fs.mkdirSync(this.dir);
        }
    }

    /**
     * Create a new item based on the current sub class
     * @abstract
     */
    create(){

    }

    /**
     * Load all of the items from file sync use as an init function
     */
    init(){
        var files = fs.readdirSync(this.dir);
        var self = this;
        files.forEach(function(file){
            var data = fs.readFileSync(self.dir+file,'utf8');
            try {
                data = JSON.parse(data);
                var newItem = new item(self.dir,file,data);
                self.add(newItem);
            } catch(err){
                console.log(err);
            }
        });
    }

    /**
     * Get all of the items in the array
     * @return {array} the array of the items
     */
    all(){
        return this.items;
    }

    /**
     * Add an item to the items array
     * @param {item} item - the item to be added
     */
    add(item){
        this.items.push(item);
    }

    /**
     * Find an item by id
     * @param {string} id - the id to match
     * @return {item} the matching item or null if not found
     */
    findById(id){
        var item = null;
        for(let i=0,length=this.items.length; i<length; i++){
            if(this.items[i].id === id){
                item = this.items[i];
                break;
            }
        }
        return item;
    }

    /**
     * Remove an item by id also delete from disk
     * @param {string} id - the id to match
     * @param {function(err:error,done:boolean)} callback - the callback function returns true if item was removed from mem and disk
     * @return {function} the callback function
     */
    removeById(id,callback){
        for(var i=0,length=this.items.length; i<length; i++){
            if(this.items[i].id === id){
                break;
            }
        }
        if(i === length){
            return callback(new Error("Item Not Found"),null);
        }
        var self = this;
        this.items[i].unlink(function(err,done){
            if(err){
                console.log(err);
                return callback(err,null);
            }
            self.items.splice(i,1);
            return callback(null,true);
        });
    }

    /**
     * Find an item by a param in the item.data only if its a non array,object
     * @param {string} key - the key of the param
     * @param {string|number|date|boolean} value - the value of the param
     * @return {item} - the item or null if not found
     */
    findByParam(key,value){
        var item = null;
        for(let i=0,length=this.items.length; i<length; i++){
            if(this.items[i].data[key] === value){
                item = this.items[i];
                break;
            }
        }
        return item;
    }

    /**
     * Delete an item by a param in the item.data only if non array,object
     * @param {string} key - the key of the param
     * @param {string|number|date|boolean} value - the value of the param
     * @param {function(err:error,done:boolean)} callback - callback function true if sucessful or err if error
     * @return {function} the callback function
     */
    removeByParam(key,value,callback){
        for(var i=0,length=this.items.length; i<length; i++){
            if(this.items[i].data[key] === value){
                break;
            }
        }
        if(i === length){
            return callback(new Error("Item Not Found"),null);
        }
        var self = this;
        this.items[i].unlink(function(err,done){
            if(err){
                console.log(err);
                return callback(err,null);
            }
            self.items.splice(i,1);
            return callback(null,true);
        });
    }

    /**
     * Convert all of the items to a JSON sting
     * @return {string} the string of the json array
     */
    toString(){
        var str = '['
        this.items.forEach(function(item){
            str += item.toString() + ',';
        });
        str += ']';
        return str.replace(/,(?=[^,]*$)/, '');
    }

}
