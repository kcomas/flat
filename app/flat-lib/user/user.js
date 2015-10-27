
"use strict"

import item from '../helpers/items/item.js';
import emailVal from '../helpers/emailVal.js';
import crypto from 'crypto';


/**
 * This is the user class for managing user data
 * @extends {item}
 */
export default class user extends item {

    /**
     * Create a user
     * @override
     * @param {string} username - the user name of the account
     * @param {string} email - the email of the account
     * @param {string} pass - the password of the account
     * @param {function(err:err,done:boolean)} callback - if true the user was created 
     * @return {function} the callback function
     */
    create(username,email,pass,callback){
        //check email
        if(!emailVal(email)){
            return callback(new Error("Invalid Email"),null);
        }
        //generate id
        var self = this;
        this.genId(function(err,done){
            if(err){
                return callback(err,null);
            }
            self.data.username = username;
            self.data.email = email;
            self.dateCreated = new Date();
            //create a password
            self.password(pass,function(err,done){
                if(err){
                    return callback(err,null);
                }
                self.save(function(err,done){
                    return callback(err,done);
                });
            });
        });
    }


    /**
     * Create or change a password sets hash and salt
     * @param {string} pass - the password to add
     * @param {function(err:error,done:boolean)} callback - the callback if created error or true
     * @return {function} the callback function
     */
    password(pass,callback){
        var self = this;
        crypto.randomBytes(12,function(err,bytes){
            if(err){
                return callback(err,null);
            }
            self.data.salt = bytes.toString();
            var hash = crypto.createHash('sha512');
            hash.update(self.data.salt,'utf8');
            hash.update(pass,'utf8');
            self.data.hash = hash.digest('base64');
            return callback(null,true);
        });
    }

    /**
     * Authenticate a user
     * @param {string} pass - the password to check
     * @return {boolean} if the password matches or not
     */
    auth(pass){
        console.dir(pass + ' ' this.data);
        var hash = crypto.createHash('sha512');
        hash.update(pass,'utf8');
        hash.update(this.data.salt,'utf8');
        hash = hash.digest('base64');
        console.dir(hash);
        console.dir(this.data.hash);
        if(hash !== this.data.hash){
            return false;
        }
        return true;
    }



}
