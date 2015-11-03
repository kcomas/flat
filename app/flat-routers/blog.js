
"use strict"

import router from '../flat-lib/server/router.js';

const blogRouter = new router();

blogRouter.use((req,res,next)=>{
    //find the blog or next
    var newUrl = req.url.replace('/blog','');
    var blogCache = blogRouter.controller.blogCache.findByParam('permalink',newUrl);
    if(blogCache !== null){
        res.statusCode = 200;
        res.setHeader('content-type','text/html; charset=utf-8');
        res.end(blogCache.get('fileStr'));
    } else {
        next();
    }
});

blogRouter.always((req,res)=>{
    res.statusCode = 404;
    res.setHeader('content-type','text/html; charset=utf-8');
    res.end('<h1>Blog 404</h1>');
});

export default blogRouter;
