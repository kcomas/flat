
"use strict"

import router from '../flat-lib/server/router.js';

const blogListRouter = new router();

blogListRouter.use((req,res,next)=>{
    var page = req.query.page;
    try {
      page =  parseInt(page);
    } catch(err){
        page = 0;
    }
    if(isNaN(page)){
        page = 0;
    }
    let total = blogListRouter.controller.blogTemplate.numPerPage;
    let blogStr = blogListRouter.controller.blogListCache.getSelection(page,total); 
    //grab the blog template
    let blogTemplate = blogListRouter.controller.blogTemplate.cache.replace('<BLOGDATA/>','');
    blogTemplate = blogTemplate.replace('<BLOGLIST/>',blogStr);
    res.statusCode = 200;
    res.setHeader('content-type','text/html; chartset=utf-8');
    res.end(blogTemplate);
});

blogListRouter.always((req,res)=>{
    res.statusCode = 404;
    res.setHeader('content-type','text/html; chartset=utf-8');
    res.end('<h1>Blog List 404</h1>');
});

export default blogListRouter;
