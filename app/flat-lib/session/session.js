
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
            this.data.dateCreated = new Date();
            this.data.cookieName = name;
            var cookieObj = res.setCookie(name,this.id,time);
            this.data.expires = cookieObj.expires;
            this.data.userAgent = req.headers['user-agent'];
            this.data.ip = req.headers['x-real-ip'];
            this.data.sesData = {};
            return callback(null,true);
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
