
"use strict"

import qs from 'querystring';
import fs from 'fs';

/**
 * Load a file upload or other multipart data
 * @param {object} req - the request data
 * @param {function(req:object)} callback - returns the request obejct in a callback
 * @return {function} the callback function
 */
function loadFile(req,maxPostSize,callback){
    var body = new Buffer('');
    req.on('data',function(data){
        body = Buffer.concat([body,data]);
        if(body.length > maxPostSize){
            //destory the connection
            req.connection.destroy();
        }
    });

    req.on('error',function(){
        return callback(req);
    });
    
    req.on('end',function(){
        var bufLength = body.length;
        body = body.toString('binary');
        console.dir(body);
        body = body.split("\r\n");
        var i =0;
        body.forEach(function(b){
            fs.writeFileSync('../flat-public/uploads/'+i,b);
            i++;
        });
    });
}


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
    if(req.headers['content-type'].indexOf('multipart/form-data')  > -1){
        //load form
        loadFile(req,maxPostSize,function(req){
            return callback();
        });
    } else {
        //load string
    }

    /*
    var body = '';

    req.on('data',function(data){
        console.dir(data);
        body += data;
        if(body.length > maxPostSize){
            //destory the connection
            req.connection.destroy();
        }
    });

    req.on('error',function(){
        return callback();
    });
    
    req.on('end',function(){
            try {
                req.body = JSON.parse(body);
                return callback();
            } catch(err){
                req.body = qs.parse(body);
                return callback();
            }
        }
    });
    */
}
