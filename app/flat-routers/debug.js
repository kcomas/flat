
"use strict"

import router from '../flat-lib/server/router.js';

const debugRouter = new router();

debugRouter.loadConfig('./flat-config/debug.json');

debugRouter.use((req,res,next)=>{
    if(debugRouter.getValue('enabled') === 'true'){
        next();
    } else {
        res.redirect('/');
    }
});

debugRouter.get('/flat-debug/view',(req,res)=>{
    res.setHeader('content-type','text/plain; charset=utf-8');
    var jsonString = '';
    var manager = req.query.manager;
    if(manager){
        try {
            jsonString = JSON.stringify(debugRouter.controller[manager],null,2);
        } catch(err){
            jsonString = JSON.stringify(debugRouter.controller,null,2);
        }
    } else {
        jsonString = JSON.stringify(debugRouter.controller,null,2);
    }
    res.statusCode = 200;
    res.end(jsonString);
});

debugRouter.always((req,res)=>{
    res.statusCode = 404;
    res.setHeader('content-type','text/html; charset=utf-8');
    res.end('<h1>Not Found</h1>');
});

export default debugRouter;
