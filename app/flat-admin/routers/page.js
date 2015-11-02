
"use strict"

import router from '../../flat-lib/server/router.js';
import showError from '../helpers/showError.js';
import showSuccess from '../helpers/showSuccess.js';
import pageRender from '../../flat-lib/helpers/pageRender.js';

const pageRouter = new router();

//list all of the pages
pageRouter.post('/flat-admin/page/list',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf8');
    res.end(pageRouter.controller.pageManager.toString());
});

//delete page
pageRouter.post('/flat-admin/page/remove',(req,res)=>{
    pageRouter.controller.pageManager.removeByParam('permalink',req.body.permalink,(err,done)=>{
        if(err){
            showError(req,res,err,500);
        } else {
            //delete the cached page if it exists
            pageRouter.controller.cacheManager.removeByParam('permalink',req.body.permalink,(err,done)=>{
                showSuccess(req,res,"item deleted",200);
            });
        }
    });
});

//add update a page
pageRouter.post('/flat-admin/page/upsert',(req,res)=>{
    var permalink = req.body.permalink
    var def = req.body.def;
    var template = req.body.template;
    var page = pageRouter.controller.pageManager.findByParam('permalink',permalink);
    if(page === null){
        pageRouter.controller.pageManager.create(permalink,def,template,(err,done)=>{
            if(err){
                showError(req,res,err,500);
            } else {
                showSuccess(req,res,'update/saved',200);
            }
        });
    } else {
        page.upsert({'def':def,'template':template},(err,done)=>{
            if(err){
                showError(req,res,err,500);
            } else {
                showSuccess(req,res,'update/saved',200);
            }
        });
    }
});

//create a page and add it to the cache
pageRouter.post('/flat-admin/page/render',(req,res)=>{
    var permalink = req.body.permalink;
    var page = pageRouter.controller.pageManager.findByParam('permalink',permalink);
    if(page === null){
        showError(req,res,new Error('No Page Found'),500);
    } else {
        //find the page template
        var template = pageRouter.controller.templateManager.findByParam('name',page.get('template'));
        if(template === null){
            showError(req,res,new Error('Page Template Not Found'),500);
        } else {
            var cache = pageRouter.controller.cacheManager.findByParam('permalink',permalink);
            var fileStr = pageRender(page.get('def'),template.get('layout'));
            if(cache === null){
                //create
                pageRouter.controller.cacheManager.create(permalink,fileStr,(err,done)=>{
                    if(err){
                        showError(req,res,err,500);
                    } else {
                        showSuccess(req,res,"Page Rendered",200);
                    }
                });
            } else {
                //update
                cache.upsert({'fileStr':fileStr},(err,done)=>{
                    if(err){
                        showError(req,res,err,500);
                    } else {
                        showSuccess(req,res,"Page Rendered",200);
                    }
                });
            }
        }
    }
});

pageRouter.always((req,res)=>{
    showError(req,res,new Error("Not Found"),404);
});

export default pageRouter;
