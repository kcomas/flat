
"use strict"

import uploadedFiles from '../helpers/uploadedFiles.js';
import fs from 'fs';

/**
 * This function adds new methods to the response object
 * @return {function(req:object,res:object,next:function)} the middlewear function
 */
export default function responseMods(){
    return function(req,res,next){
        //redirect to a url on the site
        res.redirect = function(){
            //@TODO redirect
            res.writeHead(302,{'Location':''});
            res.end();
        };

        //send a static file without modifications
        res.sendStatic = function(file){
            //determine the mime type
            var mime = uploadedFiles.mime(file);
            //determine encoding
            var encoding = uploadedFiles.determineEncoding(mime);
            fs.readFile(file,encoding,function(err,fileStr){
                if(err){
                    res.statusCode = 500;
                    res.setHeader('content-type','text/html; charset=utf-8');
                    res.end('Failed To Load Static File');
                } else {
                    res.statusCode = 200;
                    res.setHeader('content-type',mime+'; charset=utf-8');
                    res.end(fileStr);
                }
            });
        };
        next();
    }
}
