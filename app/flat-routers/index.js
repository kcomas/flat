
"use strict"

import router from '../flat-lib/server/router.js';

const mainRouter = new router();

//load a page form the cache
mainRouter.use((req,res,next)=>{
    if(req.method === 'GET'){
        var cache = mainRouter.controller.cacheManager.findByParam('permalink',req.url);
            res.setHeader('content-type','text/html; charset=utf-8');
        if(cache === null){
            res.statusCode = 404;
            res.end('<h1>Not Found</h1>');
        } else {
            res.stausCode = 200;
            res.end(cache.get('fileStr'));
        }
    } else {
        next();
    }
});


//404 page
mainRouter.always((req,res)=>{
    res.statusCode = 404;
    res.setHeader('content-type','text/html; charset=utf-8');
    res.end('<h1>Main 404</h1>');
});

export default mainRouter;
