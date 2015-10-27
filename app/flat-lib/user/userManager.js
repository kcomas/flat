
import manager from '../helpers/items/manager.js';
import user from './user.js';

/**
 * This class manages the users
 * @extends {manager}
 */
export default class userManager extends manager {

    /**
     * Create a user
     * @override
     * @param {string} username - the users account name
     * @param {string} email - the users email
     * @param {string} pass - the users password
     * @param {function(err:error,done:boolean)} callback - callback function done is true if account created
     * @return {function} the callback function
     */
    create(username,email,pass,callback){
        var usr = new user(this.dir);
        var self = this;
        usr.create(username,email,pass,function(err,done){
            if(err){
                return callback(err,null);
            }
            self.add(usr);
            return callback(null,true);
        });
    }

}
