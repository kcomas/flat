
"use strict"

import router from '../flat-lib/server/router.js';

var debugRouter = new router();

debugRouter.loadConfig('./flat-config/debug.json');

debugRouter.use((req,res,next)=>{
    if(debugRouter.getValue('enabled') === 'true'){
        next();
    } else {
        res.redirect('/');
    }
});


debugRouter.get('/flat-debug/view',(req,res)=>{
    res.setHeader('content-type','application/json; charset=utf-8');
    try {
        var manager = req.query.manager;
        var jsonString = debugRouter.controller[manager].toString();
    } catch(err){
        res.statusCode = 500;
        res.end(err);
        return;
    }
    res.statusCode = 200;
    res.end(jsonString);
});

export default debugRouter;
