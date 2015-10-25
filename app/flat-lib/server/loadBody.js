
"use strict"

import qs from 'querystring';

/**
 * Convert form data to an object as key:value as of now does not nest files,strings only
 * @param {string} formData - the form data to parse
 * @return {object} the form data object
 */
 function parseFormData(formData){
    console.log(formData);
    var string = formData.split('Content-Disposition:');
 
     string.shift();
     
     var arr = [];
     
     string.forEach(function(str){
         str = str.replace('form-data;','')
         str = str.substring(0,str.indexOf('\r\n--'));
         str = str.split('\r\n\r\n');
         var obj = {};
         if(str[0].indexOf('"; filename="') > -1){
            obj.type = 'file';
            var sub = str[0].split('"; filename="');
            obj.name = sub[0].split('="')[1];
            obj.filename = sub[1].split('"')[0];
            obj.value = str[1];
         } else {
            obj.type = 'string'
            var sub = str[0].split('=');
            sub = sub[1].replace(/"/g,'');
            obj.name = sub;
            obj.value = str[1];
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
