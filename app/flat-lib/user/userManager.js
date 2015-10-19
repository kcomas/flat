
"use strict"

import fs from 'fs';
import user from './user.js';




/**
 * This class manages all of the users in memory for the server
 */
export default class userManager {

    /**
     * @constructor
     * @param {string} dir - the directory of the user files
     */
    constructor(dir){
        
        /**
         * The dir of the user files
         * @type {string}
         */
        this.dir = dir;

        /**
         * The array of users in memory
         * @type {array}
         */
        this.users = [];

    }
    
    /**
     * Load the uses from the files, due to async the function is recursive
     * @param {string} dir - the users files directory
     * @param {array} userFiles - the list of user files in the dir
     * @param {number} position - the position in the userfiles array
     * @param {array} users - the stored users array data
     * @param {function(err:error,users:array)} callback - the callback function that returns error or an array
     * @return {function} the callback function
     */
    static loadUsers(dir,userFiles,position,users,callback){
        if(position === userFiles.length){
           return callback(null,users); 
        }
        var user = new user(dir,userFiles[position]);
        user.load(function(err,done){
            if(err){
                return callback(err,null);
            }
            users.push(user);
            position++;
            return loadUsers(dir,userFiles,position,users,callback);
        });
    }

    /**
     * Load all of the users into memory from file, init the class
     * @param {function(err:error,done:boolean)} callback - the callback function shows if an error or booelan done
     * @return {function} the callback when the loading complete
     */
    init(callback){
        fs.readdir(dir,function(err,userFiles){
            if(err){
                return callback(err,null);
            }
            //load the users
            userManager.loadUsers(dir,userFiles,0,[],function(err,users){
                if(err){
                    return callback(err,null);
                }
                this.users = users;
                return callback(null,true);
            });
        });
    }



}
