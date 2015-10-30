
"use strict"

import router from '../../flat-lib/server/router.js';
import auth from '../helpers/auth.js';
import showError from '../helpers/showError.js';
import showSuccess from '../helpers/showSuccess.js'

var sectionRouter = new router();

sectionRouter.use(auth(sectionRouter.controller));

//add/update a section to the sectionManager
sectionRouter.post('/flat-admin/section/upsert',(req,res)=>{
    var name = req.body.name;
    var content = req.body.content;
    //find if it exists
    var section = sectionRouter.controller.sectionManager.findByParam('name',name);
    if(section === null){
        sectionRouter.controller.sectionManager.create(name,content,(err,done)=>{
            if(err){
                showerror(req,res,err,500);
            } else {
                showSuccess(req,res,"updated/saved",200);
            }
        });
    } else {
        section.upsert({'layout':content},(err,done)=>{
            if(err){
                showerror(req,res,err,500);
            }
            showSuccess(req,res,"updated/saved",200);
        });
    }
});

//list all of the sections
sectionRouter.post('/flat-admin/section/list',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf8');
    res.end(sectionRouter.controller.sectionManager.toString());
});

//delete section
sectionRouter.post('/flat-admin/section/remove',(req,res)=>{
    var item = sectionRouter.controller.sectionManager.removeByParam('name',req.body.name,(err,done)=>{
        if(err){
            showError(req,res,err,500);
        } else {
            showSuccess(req,res,"item deleted",200);
        }
    });

});

sectionRouter.always((req,res)=>{
    showError(req,res,new Error("Not Found"),404);
});

export default sectionRouter;
