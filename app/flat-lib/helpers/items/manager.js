
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
            console.log(file);
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
     * Set the items array
     * @param {array} newItems - the new items to set
     */
    set(newItems){
        this.itmes = newItems;
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
     * @param {function(err:error,done:array)} callback - the callback function returns an array of the items removed
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
                return callback(err,null);
            }
            var removed = self.items.splice(i,1);
            return callback(null,removed);
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
     * Find many items by a param
     * @param {string} key - the key of the param
     * @param {string|number|date|boolean} value - the value of the param
     * @return {arry} - the items or [] if not found
     */
    findManyByParam(key,value){
        var item = [];
        this.items.forEach(function(it){
            if(it.data[key] === value){
                item.push(it);
            }
        });
        return item;
    }

    /**
     * Find a single item by many params
     * @param {object} obj - the object to be used in the search
     * @property {string} key - the key of the param to find
     * @property {string|number|boolean|null} value - the value to match
     * @return {item} item - the matched item or null if not found
     */
    findByManyParams(obj){
        var item = null;
        //obj keys
        var keys = Object.keys(obj);
        var keyLength = keys.length;
        for(var i=0,l=this.items.length; i<l; i++){
            for(var x=0; x<keyLength; x++){
                if(this.items[i].data[keys[x]] !== obj[keys[x]]){
                    break;
                }
            }
            if(x === keyLength){
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
     * @param {function(err:error,done:array)} callback - callback function returns array of removed items
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
                return callback(err,null);
            }
            var removed = self.items.splice(i,1);
            return callback(null,removed);
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
