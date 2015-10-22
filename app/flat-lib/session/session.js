
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
     * @param {string} name - the name of the cookie
     * @param {number} time - the time in ms of the cookie
     * @param {function(err:error,done:boolean)} callback - the callback function done is true if created
     * @return {function} the callback function
     */
    create(req,res,name,time,callback){
        var self = this;
        this.idGen(function(err,done){
            if(err){
                return callback(err,null);
            }
            //create a new cookie
            self.data.dateCreated = new Date();
            self.data.cookieName = name;
            var cookieObj = res.setCookie(name,self.id,time);
            self.data.expires = cookieObj.expires;
            self.data.userAgent = req.headers['user-agent'];
            self.data.ip = req.headers['x-real-ip'];
            self.data.sesData = {};
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
