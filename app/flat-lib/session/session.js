
"use strict"

import item from '../helpers/items/item.js';

/**
 * The session class for session
 * @extends {item}
 */
export default class session extends item {

    /**
     * Create a new session
     * @override
     * @param {object} req - the request object
     * @param {object} res - the response object
     * @param {object} sesData - the session data
     * @param {function(err:error,done:boolean)} callback - the callback function done is true if created
     * @return {function} the callback function
     */
    create(req,res,sesData,callback){
        var self = this;
        this.idGen(function(err,done){
            if(err){
                return callback(err,null);
            }
            //create a new cookie
            self.data.dateCreated = new Date();
            self.data.cookieName = req.sessionCookieName;
            var cookieObj = res.setCookie(name,self.id,req.sessionCookieTime);
            self.data.expires = cookieObj.expires;
            self.data.userAgent = req.headers['user-agent'];
            self.data.ip = req.headers['x-real-ip'];
            self.data.sesData = sesData;
            self.save(function(err,done){
                return callback(err,done);
            });
        });
    }

    /**
     * Get the session data
     * @return {object} the session data
     */
    get sesData(){
        return this.data.sesData;
    }

    /**
     * Add to the session data
     * @param {string} key - the key for the new data
     * @param {string|object|number|date,array,null} value - the new data
     */
    addData(key,value){
        this.data.sesData[key] = value;
    }

    /**
     * Remove from the session data
     * @param {string} key - the key for the data to delete
     */
    deleteData(key){
        delete this.data.sesData[key];
    }

    /**
     * Is the session expired?
     * @return {boolean} if the session is expired
     */
    get expired(){
        var date = new Date();
        if(date > this.data.expires){
            return true;
        }
        return false;
    }

    /**
     * Remove a session cookie
     */
    destory(){
        res.removeCookie(this.data.cookieName);
    }

}
