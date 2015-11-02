
"use strict"

import router from '../../flat-lib/server/router.js';
import showError from '../helpers/showError.js';
import showSuccess from '../helpers/showSuccess.js';
import tail from '../../flat-scripts/tail.js';

const indexRouter = new router();

//list the sessions
indexRouter.post('/flat-admin/index/list-sessions',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','text/plain; charset=utf-8');
    res.end(indexRouter.controller.sessionManager.toString());
});

//get the current info object
indexRouter.post('/flat-admin/index/info',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','text/plain; charset=utf-8');
    res.end(indexRouter.controller.info.toString());
});

//grab a log file
indexRouter.post('/flat-admin/index/log',(req,res)=>{
    var log = req.body.log;
    var lines = parseInt(req.body.lines);
    if(lines > 500){
        lines = 500;
    }
    var logDir = indexRouter.controller.config.get('logDir');
    tail(log,lines,(err,file)=>{
        res.setHeader('content-type','text/plain; charset=utf-8');
        if(err){
            res.statusCode = 500;
            res.end(err);
            return;
        }
        res.statusCode = 200;
        res.end(file);
    });
});

indexRouter.always((req,res)=>{
    showError(req,res,new Error("Not Found"),404);
});

export default indexRouter;
