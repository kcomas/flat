
"use strict"

import templateRouter from '../../flat-lib/server/router.js';
import auth from '../helpers/auth.js';
import showError from '../helpers/showError.js';
import showSuccess from './helpers/showSuccess.js';

templateRouter.use(auth(templateRouter.controller));

//add update a template
templateRouter.post('/flat-admin/template/upsert',(req,res)=>{
    var name = req.body.name;
    var layout = req.body.layout;
    try {
      JSON.parse(layout);
    } catch(err){
        showError(req,res,err,500);
        return;
    }
    var template = templateRouter.controller.templateManager.findByParam('name',name);
    if(template === null){
        templateRouter.controller.templateManager.create(name,layout,(err,done)=>{
            if(err){
                showError(req,res,err,500);
            } else {
                showSuccess(req,res,'update/saved',200);
            }
        });
    } else {
        template.upsert({'layout':layout},(err,done)=>{
            if(err){
                showError(req,res,err,500);
            } else {
                showSuccess(req,res,'update/saved',200);
            }
        });
    }
});

//list all of the templates
templateRouter.post('/flat-admin/template/list',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf8');
    res.end(templateRouter.controller.templateManager.toString());
});

//delete template
templateRouter.post('/flat-admin/template/remove',(req,res)=>{
    var item = templateRouter.controller.templateManager.removeByParam('name',req.body.name,(err,done)=>{
        if(err){
            showError(req,res,err,500);
        } else {
            showSuccess(req,res,"item deleted",200);
        }
    });

});

//load a private file
templateRouter.post('/flat-admin/template/load-private',(req,res)=>{
    var filename = req.body.filename;
    var item = templateRouter.controller.uploadManager.findByManyParams({'fileName':filename,'private':true});
    if(item === null){
        showError(req,res,new Error('private file not found'),500);
    } else {
        uploader.readFile(uploader.privateDir+filename,(err,mime,file)=>{
            if(err){
                showError(req,res,err,500);
            } else {
                res.statusCode = 200;
                res.setHeader('content-type',mime + '; charset=utf-8');
                res.end(file);
            }
        });
    }
});

templateRouter.always((req,res)=>{
    showError(req,res,new Error("Not Found"),404);
});

export default templateRouter;
