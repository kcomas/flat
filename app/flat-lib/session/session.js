
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
        this.genId((err,done)=>{
            if(err){
                return callback(err,null);
            }
            //create a new cookie
            this.data.dateCreated = new Date();
            this.data.cookieName = req.sessionCookieName;
            var cookieObj = res.setCookie(req.sessionCookieName,this.id,req.sessionCookieTime,'/');
            this.data.expires = cookieObj.expires;
            this.data.userAgent = req.headers['user-agent'];
            this.data.ip = req.headers['x-real-ip'];
            this.data.sesData = sesData;
            this.save((err,done)=>{
                return callback(err,done);
            });
        });
    }

    /**
     * Get the session data by a param
     * @param {string} name - the name of the session var to get
     * @return {object|array|string|number|null|date} the session data item
     */
    getData(name){
        return this.data.sesData[name] || null;
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
     * Remove a session
     * @param {object} res - the response object
     * @param {function(error:err,done:boolean)} callback - done is true if the session was deleted
     * @return {function} - the callback function
     */
    destroy(res,callback){
        res.removeCookie(this.data.cookieName,'/');
        this.unlink((err,done)=>{
            if(err){
                return callback(err,null)
            }
            return callback(null,true);
        });
    }

}
