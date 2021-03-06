
"use strict"

import qs from 'querystring';

/**
 * Load a file upload or other multipart data
 * @param {object} req - the request data
 * @param {number} maxPostSize - the maximum upload size
 * @param {function(req:object)} callback - returns the request obejct in a callback
 * @return {function} the callback function
 */
function loadFile(req,maxPostSize,callback){
    var body = new Buffer('');
    req.on('data',(data)=>{
        body = Buffer.concat([body,data]);
        if(body.length > maxPostSize){
            //destory the connection
            req.connection.destroy();
        }
    });

    req.on('error',()=>{
        return callback(req);
    });
    
    req.on('end',()=>{
        body = body.toString('binary');
        req.body = {};
        req.body.files = {};
        var string = body.split('Content-Disposition:');

		string.shift();


		//var reg = new RegExp('(\r\n|\r|\n)', 'g');

		string.forEach((str)=>{
			str = str.replace('form-data;', '')
		    str = str.substring(0, str.indexOf('\r\n--'));
		    str = str.split('\r\n\r\n');
		    var obj = {};
		    if (str[0].indexOf('"; filename="') > -1) {
		        obj.type = 'file';
		        var sub = str[0].split('"; filename="');
                var type = sub[1].split('"');
		        var name = sub[0].split('="')[1];
		        req.body.files[name] = {}; //name
		        req.body.files[name].filename = type[0];
		        req.body.files[name].data = str[1];
		    } else {
		        var sub = str[0].split('=');
		        sub = sub[1].replace(/"/g, '');
		        req.body[sub] = str[1];
			}
	    });
	    return callback(req);
    });
}

/**
 * Load a post string
 * @param {object} req - the request object
 * @param {number} maxPostSize - the maximum upload size
 * @param {function(req:object)} callback - returns the request obejct in a callback
 * @return {function} the callback function
 */
function loadString(req,maxPostSize,callback){
    var body = '';

    req.on('data',(data)=>{
        body += data;
        if(body.length > maxPostSize){
            //destory the connection
            req.connection.destroy();
        }
    });

    req.on('error',()=>{
        return callback(req);
    });
    
    req.on('end',()=>{
        try {
            body = JSON.parse(body);
        } catch(err){
            body = qs.parse(body);
        }
        req.body = body;
        return callback(req);
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
    if(req.headers['content-type']){
        if(req.headers['content-type'].indexOf('multipart/form-data')  > -1){
            //load form
            loadFile(req,maxPostSize,(req)=>{
                return callback();
            }); 
        } else {
            //load string
            loadString(req,maxPostSize,(req)=>{
                return callback();
            });
        }   
    } else {
        //don't load
		return callback();
	}

}
