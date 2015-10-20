
"use strict"

import manager from '../helpers/item/manager.js';
import session from './session.js';

/**
 * The session manager for handeling all sessions
 * @extends {manager}
 */
export default class sessionManager extends manager {

    /**
     * Create a new session
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




}
