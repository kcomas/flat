
"use strict"

import manager from '../helpers/items/manager.js';
import session from './session.js';

/**
 * The session manager for handeling all sessions
 * @extends {manager}
 */
export default class sessionManager extends manager {

    /**
     * Create a new session
     * @override
     * @param {object} req - the request object
     * @param {object} res - the response object
     * @param {object} sesData - the session data 
     * @param {function(err:error,done:boolean)} callback - done is true if the session was created
     * @return {function} the callback function
     */
    create(req,res,sesData,callback){
        var ses = new session(this.dir);
        var self = this;
        ses.create(req,res,sesData,function(err,done){
            if(err){
                return callback(err,null);
            }
            self.add(ses);
            return callback(null,true);
        });
    }

    /**
     * Get a session from a cookie
     * @param {object} req - the request object
     * @return {session} return a session object or null if not found
     */
    getSession(req){
        var ses = null;
        if(!req.cookies[req.sessionCookieName]){
            console.log("cookies not found");
            return null;
        }
        for(var i=0,l=this.items.length; i<l; i++){
            console.dir(this.items[i]);
            if(this.items[i].id === req.cookies[req.sessionCookieName]){
                ses = this.items[i];
                break;
            }
        }
        return ses;
    }

    /**
     * Syncronously remove all of the expired sessions
     */
    clean(){
        this.items.forEach(function(ses){
            if(ses.expired()){
                ses.unlinkSync();
            }
        });
    }


}
