
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
        this.genId((err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.data.username = username;
            this.data.email = email;
            this.dateCreated = new Date();
            //create a password
            this.password(pass,(err,done)=>{
                if(err){
                    return callback(err,null);
                }
                this.save((err,done)=>{
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
        crypto.randomBytes(12,(err,bytes)=>{
            if(err){
                return callback(err,null);
            }
            this.data.salt = bytes.toString();
            var hash = crypto.createHash('sha512');
            hash.update(pass,'utf8');
            hash.update(this.data.salt,'utf8');
            this.data.hash = hash.digest('base64');
            return callback(null,true);
        });
    }

    /**
     * Authenticate a user
     * @param {string} pass - the password to check
     * @return {boolean} if the password matches or not
     */
    auth(pass){
        var hash = crypto.createHash('sha512');
        hash.update(pass,'utf8');
        hash.update(this.data.salt,'utf8');
        hash = hash.digest('base64');
        if(hash !== this.data.hash){
            return false;
        }
        return true;
    }



}
