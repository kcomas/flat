
"use strict"

import qs from 'querystring';

/**
 * This function loads the post body data if the method is post
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {number} maxPostSize - the maximum size of a post request
 * @param {function} callback - the callback function beacuse loading is async
 * @return {object} the request
 * @property {object} req.body the request body
 */
export default function loadBody(req,res,maxPostSize,callback){
    req.body = {};
    if(req.method !== 'POST'){
        return callback();
    }

    var body = '';

    req.on('data',function(data){
        body += data;
        if(body.length > maxPostSize){
            //destory the connection
            req.connection.destroy();
        }
    });

    req.on('error',function(){
        callback();
    });

    req.on('end',function(){
        try {
            req.body = JSON.parse(body);
            return callback();
        } catch(err){

        }
        req.body = qs.parse(body);
        return callback();
    });
}
