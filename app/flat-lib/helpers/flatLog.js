
"use strict"

import fs from 'fs';

/**
 * Class to log incoming requests to file and console
 */
export default class flatLog {

    /*
     * @constructor
     * @param {string} dir - the dir to store the log files
     * @param {boolean} console - log to console if true
     */
    constructor(dir,console){

        /**
         * The dir we save the logs to
         * @type {string}
         */
        this._dir = dir;

        //make sure the dir exists
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        /**
         * The boolean if we log to console
         * @type {boolean}
         */
        this._console = console;

        /**
         * The non 200,300 log
         * @type {string}
         */
        this.errorLog = 'error.log'

        /**
         * The 200,300 log
         * @type {string}
         */
        this.accessLog = 'access.log'

    }

    /**
     * Log a request
     * @return {function(req:object,res:object,next:function)} - the standard for middlewear
     */
    log(){
        return (req,res,next)=>{
            req.startTime = new Date();
            res.on('finish',()=>{
                var done = new Date();
                var logObj = {
                    status: res.statusCode,
                    method : req.method,
                    ms : (done - req.startTime),
                    url : req.url,
                    ip : req.headers['x-real-ip'],
                    userAgent : req.headers['user-agent'],
                    date : done    
                };
                if(this._console === "true"){
                    console.dir(logObj);
                }
                var strCode = res.statusCode.toString();
                if(strCode[0] === '3' || strCode[0] === '2'){
                    var file = this.accessLog;
                } else {
                    var file = this.errorLog;
                }
                fs.appendFile(this._dir+file,JSON.stringify(logObj).replace('{','').replace('}','')+'\n','utf8',(err)=>{
                    if(err){
                        console.dir(err);
                    }
                });
            });
            next();
        }
    }


}
