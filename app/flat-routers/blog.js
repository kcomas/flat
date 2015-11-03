
"use strict"

import router from '../flat-lib/server/router.js';

const blogRouter = new router();





blogRouter.always((req,res)=>{
    res.statusCode = 404;
    res.setHeader('content-type','text/html; charset=utf-8');
    res.end('<h1>Not Found</h1>');
});

export default blogRouter();
