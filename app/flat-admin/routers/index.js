
"use strict"

import router from '../../flat-lib/server/router.js';
import showError from '../helpers/showError.js';
import showSuccess from '../helpers/showSuccess.js';
import tail from '../../flat-scripts/tail.js';

const indexRouter = new router();

//list the sessions
indexRouter.post('/flat-admin/index/list-sessions',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf-8');
    res.end(indexRouter.controller.sessionManager.toString());
});

//get the current info object
indexRouter.post('/flat-admin/index/info',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf-8');
    res.end(indexRouter.controller.info.toString());
});

//force the info object to disk
indexRouter.post('/flat-admin/index/info/toDisk',(req,res)=>{
    indexRouter.controller.info.write((err,done)=>{
        res.setHeader('content-type','text/html; charset=utf8');
        if(err){
            showError(req,res,new Error('Failed To Write To Disk'),500);
            return;
        }
        showSuccess(req,res,'Info Writen',200);
    });
});

//grab a log file
indexRouter.post('/flat-admin/index/log',(req,res)=>{
    var log = req.body.log;
    var lines = parseInt(req.body.lines);
    if(lines > 500){
        lines = 500;
    }
    var logDir = indexRouter.controller.config.getValue('logDir');
    tail(logDir+log,lines,(err,file)=>{
        res.setHeader('content-type','text/plain; charset=utf-8');
        res.statusCode = 200;
        if(err){
            res.end(err);
            return;
        }
        res.end(file);
    });
});



indexRouter.always((req,res)=>{
    showError(req,res,new Error("Not Found"),404);
});

export default indexRouter;
