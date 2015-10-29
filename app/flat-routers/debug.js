
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
    var jsonString = '';
    try {
        var manager = req.query.manager;
        jsonString = debugRouter.controller[manager].toString();
    } catch(err){
        res.statusCode = 500;
        console.dir(err);
        res.end(JSON.stringify(err));
        return;
    }
    res.statusCode = 200;
    res.end(jsonString);
});

export default debugRouter;
