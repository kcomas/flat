
"use strict"

import qs from 'querystring';

/**
 * Convert form data to an object as key:value as of now does not nest files,strings only
 * @param {string} formData - the form data to parse
 * @return {object} the form data object
 */
 function parseFormData(formData){
		var string = formData.split('Content-Disposition:');
 
string.shift();

var arr = [];

var reg = new RegExp('(\r\n|\r|\n)', 'g');

	string.forEach(function (str) {
	    str = str.replace('form-data;', '')
	    str = str.substring(0, str.indexOf('\r\n--'));
	    str = str.split('\r\n\r\n');
	    var obj = {};
	    if (str[0].indexOf('"; filename="') > -1) {
	        obj.type = 'file';
	        var sub = str[0].split('"; filename="');
	        obj.name = sub[0].split('="')[1].replace(reg, '');
	        var type = sub[1].split('"');
	        obj.filename = type[0].replace(reg, '');
	        if (type[1].indexOf('text') > -1 || type[1].indexOf('json') > -1) {
	            obj.value = str[1].replace(reg, '');
	        } else {
	            //binary
	           // str[1] = str[1].replace(reg, '');
	           /*
	            var idx, len = str[1].length,
	                arr2 = new Array(len);
	            for (var idx = 0; idx < len; ++idx) {
	                arr2[idx] = str[1].charCodeAt(idx) & 0xFF;
	            }
	            */
	            obj.value = new Uint8Array(str[1]).buffer;
	        }
	    } else {
	        obj.type = 'string'
	        var sub = str[0].split('=');
	        sub = sub[1].replace(/"/g, '');
	        obj.name = sub.replace(reg, '');
	        obj.value = str[1].replace(reg, '');
	    }
	    arr.push(obj);
	});
     return arr;
 };

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
        if(req.headers['content-type'].indexOf('multipart/form-data')  > -1){
            var fileData = parseFormData(body);
            fileData.forEach(function(file){
                if(file.type === 'string'){
                    req.body[file.name] = file.value;
                } else {
                    req.body.files = {};
                    req.body.files[file.name] = {};
                    req.body.files[file.name]['filename'] = file.filename;
                    req.body.files[file.name]['data'] = file.value;
                }
            });
            return callback();
        } else {
            try {
                req.body = JSON.parse(body);
                return callback();
            } catch(err){
                req.body = qs.parse(body);
                return callback();
            }
        }
    });
}
