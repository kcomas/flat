
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
        ses.create(req,res,sesData,(err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.add(ses);
            return callback(null,true);
        });
    }
    
    /**
     * Int all of the sessions
     * @override
     */
    init(){
        var itemArr = subInt();
        itemArr.forEach(obj){
            var newItem = new session(this.dir,obj.file,obj.data);
            this.add(newItem);
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
            return null;
        }
        for(var i=0,l=this.items.length; i<l; i++){
            if(this.items[i].id === req.cookies[req.sessionCookieName]){
                ses = this.items[i];
                break;
            }
        }
        return ses;
    }

    /**
     * Remove a session from memoery and disk
     * @param {object} req - the request object
     * @param {object} res - the response object
     * @param {function(err:error,done:boolean)} callback - done is true if the session was removed
     * @return {function} the callback function
     */
    destroy(req,res,callback){
        if(!req.cookies[req.sessionCookieName]){
            return callback(new Error('No session found'),null);
        }
        for(var i=0,l=this.items.length; i<l; i++){
            if(this.items[i].id === req.cookies[req.sessionCookieName]){
                break;
            }
        }
        if(i === l){
            return callback(new Error('No session found'),null);
        }
        this.items[i].destroy(res,(err,done)=>{
            if(err){
                return callback(err,null);
            }
            this.items.splice(i,1);
            return callback(null,true);
        });
    }

    /**
     * Syncronously remove all of the expired and orphaned sessions
     */
    clean(){
      for(let i=0,l=this.items.length; i<l; i++){
        if(this.items[i].expired){
            this.items[i].unlinkSync();
            this.items.splice(i,1);
            i--;
        }
      }
      //removes the nulls from the array
    }


}
