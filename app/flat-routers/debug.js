
"use strict"

import router from '../flat-lib/server/router.js';

var debugRouter = new router();

debugRouter.loadConfig('./flat-config/debug.json');

console.dir(debugRouter.controller);

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
    try {
        var manager = req.query.manager;
        jsonString = debugRouter.controller[manager].toString();
    } catch(err){
        jsonString = JSON.stringify(debugRouter.controller,null,2);
    }
    res.statusCode = 200;
    res.end(jsonString);
});

export default debugRouter;
