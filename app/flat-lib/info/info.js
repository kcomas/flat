
"use strict"

import fs from 'fs';


/**
 * This class collects information from various parts of the server
 */
export default class info {

    /**
     * Set the dir and file for storing the data on disk
     * @constructor
     * @param {string} dir - the dir to store the file
     * @param {string} filename - the json filename on disk
     * @param {number} writeInfoToDiskAfter - the number of updates to the data object before we write to disk
     */
    constructor(dir,filename,writeInfoToDiskAfter){

        /**
         * The info storage dir
         * @type {string}
         */
        this.dir = dir;

        //check that the dir exists if not create
        try {
            var stat = fs.statSync(this.dir);
        } catch(err){
			if(err.code === 'ENOENT'){
				fs.mkdirSync(this.dir);
			} else {
				console.dir(err);
			}
        }

        /**
         * The info storage file
         * @type {string}
         */
        this.filename = filename;

        /**
         * The data collected
         * @type {object}
         */
        this._data = {};

        /**
         * The current page views key is the perm link
         * @type {object}
         */
        this._data.pageViews = {};

        /**
         * The last user who logged in name and date
         * @type {object}
         */
        this._data.lastLogin = {};

        //try to load the info file
        try {
            this._data = JSON.parse(fs.readFileSync(this.dir+this.filename,'utf8'));
        } catch(err){

        }

        /**
         * The last boot time
         * @type {date}
         */
        this._data.boot = new Date();

        /**
         * The number of updates before we write to disk
         * @type {number}
         */
        this.writeInfoToDiskAfter = writeInfoToDiskAfter;

        /**
         * The current number of updates to the data object
         * @type {number}
         */
        this.currentUpdates = 0;

    }

    /**
     * Get the current data object as a string
     * @return {string} the data object as a json string
     */
    toString() {
        return JSON.stringify(this._data,null,2);
    }

    /**
     * Write the data object to disk asyncronously
     * @param {function(err:error,done:boolean)} callback - done is true if the file was writen to disk
     * @return {function} the callback function
     */
    write(callback){
        this.currentUpdates = 0;
        fs.writeFile(this.dir+this.filename,this.toString(),'utf8',(err)=>{
            if(err){
                return callback(err,null);
            }
            return callback(null,true);
        });
    }

    /**
     * Check if we need to write to disk
     */
    checkWrite(){
        this.currentUpdates++;
        if(this.currentUpdates >= this.writeInfoToDiskAfter){
            //this is async but we are not looking if success or not
            this.write();
        }
    }

    /**
     * Get the data object
     * @return {object} the data object
     */
    get data() {
        this.checkWrite();
        return this._data;
    }

    /**
     * Set the data object
     * @param {object} obj - the new data object
     */
    set data(obj){
        this._data = obj;
    }

}
