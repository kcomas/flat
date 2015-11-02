
"use strict"

import router from '../../flat-lib/server/router.js';
import showError from '../helpers/showError.js';
import showSuccess from '../helpers/showSuccess.js';
import blogRender from '../../flat-lib/helpers/blogRender.js';

const blogRouter = new router();

//list the blogs
blogRouter.post('/flat-admin/blog/list',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf8');
    res.end(blogRouter.controller.blogManager.toString());
});

//add update a blog
blogRouter.post('/flat-admin/blog/upsert',(req,res)=>{
    var name = req.body.name;
    var title = req.body.title;
    var author = req.user.get('username');
    var excerpt = req.body.excerpt;
    var content = req.body.content;
    var tags = req.body.tags || [];
    var permalink = req.body.permalink;
    var blog = blogRouter.controller.blogManager.findByParam('permalink',permalink);
    if(blog === null){
        //create a new blog
        blogRouter.controller.blogManager.create(name,title,author,excerpt,content,tags,(err,done)=>{
            if(err){
                showError(req,res,err,500);
                return;
            }
            showSuccess(req,res,'Blog Created',200);
        });
    } else {
        //update existing
        blog.upsert({'title':title,'excerpt':excerpt,'content':content,'tags':tags},(err,done)=>{
            if(err){
                showError(req,res,err,500);
                return;
            }
            showSuccess(req,res,'Blog Updated',200);
        });
    }
});

//remove a blog
blogRouter.post('/flat-admin/blog/remove',(req,res)=>{
    var permalink = req.body.permalink;
    blogRouter.controller.blogManager.removeByParam('permalink',permalink,(err,done)=>{
        if(err){
            showError(req,res,err,500);
            return;
        }
         //delete the cached page if it exists
         blogRouter.controller.blogCache.removeByParam('permalink',permalink,(err,done)=>{
            showSuccess(req,res,"item deleted",200);
        });
    });
});

//render a blog
blogRouter.post('/flat-admin/blog/render',(req,res)=>{
    var permalink = req.body.permalink;
    var blog = blogRouter.controller.blogManager.findByParam('permalink',permalink);
    if(blog === null){
        showError(req,res,new Error('No Blog Found'),500);
        return;
    }
    var cache = blogRouter.controller.blogCache.findByParam('permalink',permalink);
    var fileStr = blogRender(blog,blogRouter.controller.blogTemplate.cache); 
    if(cache === null){
        //create
        blogRouter.controller.blogCache.create(permalink,fileStr,(err,done)=>{
            if(err){
                showError(req,res,new Error('Failed To Create'),500);
                return;
            }
            showSuccess(req,res,'Blog Cache Created',200);
        });
    } else {
        //update
        cache.upsert({'fileStr':fileStr},(err,done)=>{
            if(err){
                showError(req,res,new Error('Failed To Update'),500);
                return;
            }
            showSuccess(req,res,'Blog Updated',200);
        });
    }
});

//set the blog cache
blogRouter.post('/flat-admin/blog/blogTemplate/cache',(req,res)=>{
    var permalink = req.body.permalink;
    var cache = blogRouter.controller.cacheManager.findByParam('permalink',permalink);
    if(cache === null){
        showError(req,res,new Error('No Cache Found'),500);
        return;
    }
    blogRouter.controller.blogTemplate.cache = cache.get('fileStr');
    showSuccess(req,res,'Blog Cache Set',200);
});

//update the blog list template
blogRouter.post('/flat-admin/blog/blogTemplate/set',(req,res)=>{
    var numPerPage = parseInt(req.body.numPerPage);
    blogRouter.controller.blogTemplate.numPerPage = numPerPage;
    showSuccess(req,res,'Blog List Template Set',200);
});

//get the current blog template information
blogRouter.post('/flat-admin/blog/blogTemplate/get',(req,res)=>{
    var obj = {
        'numPerPage':blogRouter.controller.blogTemplate.numPerPage,
        'cache':blogRouter.controller.blogTemplate.cache
    };
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf-8');
    res.end(JSON.stringify(obj));
});

blogRouter.always((req,res)=>{
    showError(req,res,new Error("Not Found"),404);
});

export default blogRouter;
