
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
     * @param {string} name - the name of the cookie
     * @param {number} time - the time of the cookie in ms
     * @param {function(err:error,done:boolean)} callback - done is true if the session was created
     * @return {function} the callback function
     */
    create(req,res,name,time,callback){
        var ses = new session(this.dir);
        var self = this;
        ses.create(req,res,name,time,function(err,done){
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
     * @param {string} name - the name of the cookie
     * @return {session} return a session object or null if not found
     */
    getSession(req,name){
        var ses = null;
        if(!req.cookies[name]){
            return null;
        }
        for(var i=0,l=this.items.length; i<l; i++){
            if(this.items[i].id === req.cookies[name]){
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
