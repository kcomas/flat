
"use strict"

import qs from 'querystring';
import fs from 'fs';

/**
 * Convert form data to an object as key:value as of now does not nest files,strings only
 * @param {string} formData - the form data to parse
 * @return {object} the form data object
 */
function parseFormData(formData){
    var f = formData.split('\r\n');
    var i =0;
    f.forEach(function(data){
        fs.writeFileSync('../flat-public/uploads/'+i,new Buffer(data,'binary'));
        i++;
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
