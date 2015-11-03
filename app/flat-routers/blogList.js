
"use strict"

import router from '../flat-lib/server/router.js';

const blogListRouter = new router();

blogListRouter.use((req,res,next)=>{
    var page = req.query.page;
    try {
      page =  parseInt(page);
    } catch(err){
        page = 1;
    }
    if(page === 0){
        page = 1;
    }
});

blogListRouter.always((req,res)=>{
    res.statusCode = 404;
    res.setHeader('content-type','text/html; chartset=utf-8');
    res.end('<h1>Blog List 404</h1>');
});

export default blogListRouter;
