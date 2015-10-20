
"use strict"

import idGen from '../idGen.js';
import fileManager from '../fileManager.js';

/**
 * This class is to be used for users,sessions,pages,sections it provides a template for all to extend
 */
export default class item {

    /**
     * @constructor
     * @param {string} dir - the directory of the item
     * @param {string} filename - the filename of the item
     * @param {object} data - the data of the item
     */
    constructor(dir,filename,data){

        /**
         * The directory of the item
         * @type {string}
         */
        this.dir = dir;

        /**
         * The filename of the item
         * @type {string}
         */
        this.filename = filename || '';

        /**
         * The id of the item, the filename without .json
         */
        this.id = '';
        
        if(this.filename !== ''){
            this.id = this.filename.replace('.json','');
        }

        /**
         * The data of the item
         * @type {object}
         */
        this.data = data || {};

        /**
         * The filemanger for the object
         * @type {object}
         */
        this.fileManager = new fileManager(this.dir);

        /**
         * The id generator
         * @type function
         */
        this.idGen = idGen;

    }

    /**
     * This method is diferent depening on the sub class
     * @abstract
     */
    create(){

    }

    /**
     * Get the directory
     * @return {string} the directory
     */
    get dir(){
        return this.dir;
    }

    /**
     * Get the filename
     * @return {string} the filname
     */
    get fileName(){
        return this.filename;
    }

    /**
     * Get the id
     * @return {string} the id
     */
    get id(){
        return this.id
    }

    /**
     * Get the item data
     * @return {object} the item data
     */
    get data(){
        return this.data;
    }

    /**
     * Save the object to disk
     * @param {function(err:error,done:boolean)} callback - if the file was saved or not
     * @return {function} the callback if error or if the file saved
     */
    save(callback){
        this.fileManager.save(this.filename,this.data,function(err,done){
            return callback(err,done);
        });
    }

    /**
     * Load a file from disk
     * @param {function(err:error,done:boolean)} callback - if the file was loaded or not
     * @return {function} the callack if the file loaded or not
     */
    load(callback){
        this.fileManager.load(this.filename,function(err,obj){
            if(err){
                return callback(err,null);
            }
            this.data = obj;
            return callback(null,true);
        });
    }

    /**
     * Remove a file from disk
     * @param {function(err:error,done:boolean)} callback - if the file was deleted or error
     * @return {function} the callback function
     */
    unlink(callback){
        this.fileManager.unlink(this.filename,function(err,done){
            return callback(err,done);
        });
    }

    /**
     * Generate an id and filename
     * @return {function(err:error,done:boolean)} the callback if the id was generated or not
     */
    genId(callback){
        var self = this;
        if(this.filename === '' && this.id == ''){
            this.idGen(function(err,id){
                self.id = id;
                self.filename = id+'.json';
            });
        } else {
            return callback(new Error("Id allready generated"),null);
        }
    }

    /**
     * UpdateInsert the data var and write to disk
     * @param {object} obj - the object to be added
     * @param {function(err:error,done:boolean)} callback - the status of the update done is true if update is sucessful
     * @return {function} the callback function
     */
    upsert(obj,callback){
        for(let key in obj){
           this.data[key] = obj[key]; 
        }
        this.save(function(err,done){
            return callback(err,done);
        });
    }

    /**
     * Delete from the data var and save to disk
     * @param {array} keys - the keys to be deleted
     * @param {function(err:error,done:boolean)} callback - the status if the delete was sucessful done is true if the delete was a success
     * @return {function} the callback function
     */
    del(keys,callback){
        var self = this;
        keys.forEach(function(key){
            delete self.data[key];
        });
        this.save(function(err,done){
            return callback(err,done);
        });
    }

}
