
"use strict"

import fs from 'fs';

/**
 * This function adds new methods to the response object
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {string} staticDir - the static file dir
 * @param {number} port - the server port number
 */
export default function responseMods(req,res,staticDir,port){
        //redirect to a url on the site
        res.redirect = function(path){
            res.writeHead(302,{'Location':path});
            res.end();
        };

        //send a static file without modifications
        res.sendStatic = function(file){
            fs.readFile(staticDir+file,'utf8',(err,fileStr)=>{
                res.setHeader('content-type','text/html; charset=utf-8');
                if(err){
                    console.dir(err);
                    res.statusCode = 500;
                    res.end('Failed To Load Static File');
                } else {
                    res.statusCode = 200;
                    res.end(fileStr);
                }
            });
        };
}
