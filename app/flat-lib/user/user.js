
"use strict"

import fs from 'fs';
import crypto from 'crypto';
import idGen from '../helpers/idGen.js';


/**
 * This is the user class, each user is loaded into memory open server startup stores data about the user
 */
export default class user {

    /**
     * @constructor
     * @param {string} dir - the users directory
     * @param {string} filename - the name of the users json file
     */
    constructor(dir,filename){
        
        /**
         * The users Directory
         * @type {string}
         */
        this.dir = dir;

        /**
         * The users file
         * @type {string}
         */
        this.filename = filename || null;

        /**
         * The users data as a single object
         * @type {object}
         * @parma {string} id - the account id/autogenerated
         * @property {string} userName - the users account name,required
         * @property {string} email - the users email,required
         * @property {date} dateCreated - the creation date,auto generated
         * @property {string} salt - the users salt
         * @property {string} hash - the users hash
         */
        this.userData = {};

    }


    /**
     * Get the use id
     * @return {string} the user id
     */
    get id(){
        return this.userDate.id;
    }

    /**
     * Get the date the user signed up
     * @return {date} the date the user signed up
     */
    get dateCreated(){
        return this.userData.dateCreadted;
    }

    /**
     * Set the username
     * @param {string} name - the user name for the account
     */
    set username(name){
        this.userData.username = name;
    }

    /**
     * Get the username
     * @return {string} the username
     */
    get username(){
        return this.userData.username;
    }

    /**
     * Set the email does not change if invalid
     * @param {string} email - the users email
     */
    set email(email){
        if(user.checkEmail){
            this.userData.email = email;
        }
    }

    /**
     * Get the email
     * @return {string} the users email
     */
    get email(){
        return this.userData.email;
    }

    /**
     * Create a user and write to the disk
     * @param {string} username - the account name
     * @param {string} email - the users email
     * @param {string} pass - the users password
     * @param {function(err:error,done:boolean)} callback - the callback when the user is created
     */
    create(username,email,pass,callback){
        var self = this;
        //create the password
        if(!this.userData.id){
            this.password(pass,function(err,done){
                if(err){
                    return callback(err,null);
                }
                //create the id
                idGen(function(err,id){
                    if(err){
                        return callback(err,null);
                    }
                    //check if theo email is valid
                    if(!user.checkEmail){
                        return callback(new Error("Invalid Email"),null);
                    }
                    self.userData.userName = username;
                    self.uerData.email = email;
                    self.userData.id = id;
                    self.filename = id +'.json';
                    self.dateCreated = new Date();
                    self.save(function(err,done){
                        if(err){
                            return callback(err,null);
                        }
                    });
                });
            });
        } else {
            return callback(new Error("User Allready Exists"),null);
        }
    }

    /**
     * Check if an email is valid via regex
     * @param {string} email - the email to validate
     * @return {boolean} is the email valid
     */
    static checkEmail(email){
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(email);
    }

    /**
     * Change/set a password and salt
     * @param {string} pass - the password to be added,changed
     * @param {function(err:error,done:booelan)} callback - returns if error or if the salt and hash were added to userData 
     * @return {function} the callback funtion
     */
    password(pass,callback){
        var self = this;
        crypto.randomBytes(12,function(err,bytes){
            if(err){
                return callback(err,null);
            }
            var hash = crypto.createHash('sha512');
            self.userData.salt = bytes.toString();
            hash.update(self.userData.salt,'utf8');
            hash.update(pass,'utf8');
            self.userData.hash = hash.digest('base64');
            return callback(null,true);
        });
    }

    /**
     * Check to see if a password matches the salt,hash authenticate the user
     * @param {string} pass - the password to be matched
     * @return {boolean} check if the password matches
     */
    auth(pass){
        var hash = crypto.createHash('sha512');
        hash.update(pass,'utf8');
        hash.update(this.userData.salt,'utf8');
        hash = hash.digest('base64');
        if(hash !== this.userData.hash){
            return false;
        }
        return true;
    }

    /**
     * Save the user to disk
     * @param {function(err:error,done:boolean)} callback - if the file saved or an error
     * @return {function} the callback function
     */
    save(callback){
        if(this.filename !== null){
            try {
                var filedata = JSON.parse(this.userData);
            } catch(err){
                return callback(err,null);
            }
            fs.writeFile(this.dir+this.filename,this.filedata,'utf8',function(err){
                if(err){
                    return callback(err,null);
                }
                return callback(null,true);
            });
        }
    }

    /**
     * Load a user file from disk
     * @param {function(err:err,done:boolean)} callback - if the file was loaded or error
     * @return {function} the callback function
     */
    load(callback){
        var self = this;
        if(this.filename !== null){
            fs.readFile(this.dir+this.filename,'utf8',function(err,filedata){
                if(err){
                    return callback(err,null);
                }
                try {
                    self.userData = JSON.parse(filedata);
                } catch(err){
                    return callback(err,null);
                }
                self.filename = self.userData.id;
                return callback(null,true);
            });
        }
    }

}
