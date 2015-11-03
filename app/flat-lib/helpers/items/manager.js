
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
        
        try {
        //check that the dir exists if not create
            let stat = fs.lstatSync(this.dir);
        } catch(err){
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
     * @abstract
     */
    init(){
        
    }

    /**
     * sub int function to read all files and return data
     * @return {array} the array of the file name and file data for each manager
     */
    subInt(){
        var arr = [];
        var files = fs.readdirSync(this.dir);
        files.forEach((file)=>{
            var data = fs.readFileSync(this.dir+file,'utf8');
            try {
                data = JSON.parse(data);
                //var newItem = new item(this.dir,file,data);
                //this.add(newItem);
                var obj = {file,data}
                arr.push(obj);
            } catch(err){
                console.log(err);
            }
        });
        return arr;
    }

    /**
     * Set the items array
     * @param {array} newItems - the new items to set
     */
    setAll(newItems){
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
        this.items[i].unlink((err,done)=>{
            if(err){
                return callback(err,null);
            }
            var removed = this.items.splice(i,1);
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
        this.items.forEach((it)=>{
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
        this.items[i].unlink((err,done)=>{
            if(err){
                return callback(err,null);
            }
            var removed = this.items.splice(i,1);
            return callback(null,removed);
        });
    }

    /**
     * Convert all of the items to a JSON sting
     * @return {string} the string of the json array
     */
    toString(){
        var str = '['
        this.items.forEach((item)=>{
            str += item.toString() + ',';
        });
        str += ']';
        return str.replace(/,(?=[^,]*$)/, '');
    }

    /**
     * Retrive a certian number of items based
     * @param {number} start - the starting number in the loop
     * @param {number} total - the total number to collect
     * @return {array} the items collected
     */
    getSelection(start,total){
        var ret = [];
        for(let i=start; i<total; i++){
            if(i === this.items.length){
                break;
            }
            ret.push(this.items[i]);
        }
        return ret;
    }
    
}
