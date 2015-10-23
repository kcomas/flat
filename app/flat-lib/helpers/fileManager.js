
"use strict"

import fs from 'fs';

/**
 * Handel the loading and saving of files for users,sessions,pages,sections
 */
export default class fileManager {

    /**
     * @constructor
     * @param {string} dir - the directory of the files
     */
    constructor(dir){

        /**
         * The directory of the files
         * @type {string}
         */
        this.dir = dir;
        
        //make sure the directory exists
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

    }

    /**
     * Save an object to the disk
     * @param {string} name - the name of the file
     * @param {object} obj - the object to be saved
     * @param {function(err:error,done:boolean)} callback - the callback function returns done or error if an error saving
     * @return {function} the callback function
     */
    save(name,obj,callback){
        var file = dir + name;
        console.log(file);
        try {
            obj = JSON.stringify(obj);
        } catch(err){
            return callback(err,null);
        }
        fs.writeFile(file,obj,'utf8',function(err){
            if(err){
                console.log(err);
                return callback(err,null);
            }
            return callback(null,true);
        });
    }

    /**
     * Load an object from disk
     * @param {string} name - the name of the file
     * @param {function(err:error,obj:object)} callback - callback function shows if error or the object loaded
     * @return {function} the callback function
     */
    load(name,callback){
        var file = dir + file;
        fs.readFile(file,'utf8',function(err,data){
            if(err){
                return callback(err,null);
            }
            try {
                var obj = JSON.parse(data);
            } catch(err){
                console.log(err);
                return callback(err,null);
            }
            return callback(null,obj);
        });
    }

    /**
     * Remove an object from disk
     * @param {string} name - the name of the file
     * @param {function(err:error,done:boolean)} callback - the callback if the file was deleted or not
     * @return {function} the callback function
     */
    unlink(name,callback){
        fs.unlink(this.dir+name,function(err){
            if(err){
                return callback(err,null);
            }
            return callback(null,true);
        });
    }

    /**
     * Remove an object from disk syncronously
     * @param {string} name - the name of the file
     */
    unlinkSync(name){
        fs.unlinkSync(this.dir+name);
    }


}
