
"use strict"

import router from '../../flat-lib/server/router.js';
import showError from '../helpers/showError.js';
import showSuccess from '../helpers/showSuccess.js';

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
    var template = req.body.template;
    var permalink = req.body.permalink;
    var blog = blogRouter.controller.blogManager.findByParam('permalink',permalink);
    if(blog === null){
        //create a new blog
        blogRouter.controller.blogManager.create(name,title,author,excerpt,content,tags,template,(err,done)=>{
            if(err){
                showError(req,res,err,500);
                return;
            }
            showSuccess(req,res,'Blog Created',200);
        });
    } else {
        //update existing
        blog.upsert({'title':title,'excerpt':excerpt,'content':content,'tags':tags,'template':template},(err,done)=>{
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
        showSuccess(req,res,'Blog Removed',200);
    });
});

blogRouter.always((req,res)=>{
    showError(req,res,new Error("Not Found"),404);
});

export default blogRouter;
