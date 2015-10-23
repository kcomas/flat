
"use strict"

import fs from 'fs';
import router from '../flat-lib/server/router.js';
import pages from './pages.js';
import pageManager from './page/pageManager.js';

var adminRouter = new router();
var manager = new pageManager(pages);

//load all of the pages into memory
var renderErr = manager.renderAll();
if(renderErr.length > 0){
    console.dir(renderErr);
}

/**
 * Render a json error page
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {error} err - the json error object
 * @param {number} status - the status code
 */
function showError(req,res,err,status){
    res.statusCode = status;
    res.setHeader('Content-Type','application/json; charset=utf8');
    res.end(JSON.stringify(err));
}

adminRouter.use(function(req,res,next){
   var reg = new RegExp('^/flat-admin$|^/flat-admin/');
   if(req.method === 'GET'){
        manager.load(req.url.replace(reg,'/'),{key:'value'},function(err,page){
            if(err){
                showError(req,res,err,404);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type','text/html; charset=utf8');
                res.end(page);
            }
        });
   } else {
        next();
   }
});

//render a single admin page
adminRouter.post('/flat-admin/render',function(req,res){
    var page = req.body.page;
    var err = manager.render(page);
    if(err){
        showError(req,res,err,500);
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html; charset=utf8');
        res.end("Page Created");
    }
});

//render all of the the admin pages
adminRouter.post('/flat-admin/renderAll',function(req,res){
    var err = manager.renderAll();
    if(err.length > 0){
        showError(req,res,err,500);
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html; charset=utf8');
        res.end("Pages Created");
    }
});

//add/update a section to the sectionManager
adminRouter.post('/flat-admin/upsert-section',function(req,res){
    var name = req.body.name;
    var content = req.body.content;
    //find if it exists
    var section = adminRouter.controller.sectionManager.findByParam('name',name);
    if(section === null){
        adminRouter.controller.sectionManager.create(name,content,function(err,done){
            if(err){
                showerror(req,res,err,500);
            }
            res.statusCode = 200;
            res.setHeader('content-type','text/html; charset=utf8');
            res.end("updated/saved");
        });
    } else {
        section.upsert({'layout':content},function(err,done){
            if(err){
                showerror(req,res,err,500);
            }
            res.statusCode = 200;
            res.setHeader('content-type','text/html; charset=utf8');
            res.end("updated/saved");
        });
    }
});

//list all of the sections
adminRouter.post('/flat-admin/list-sections',function(req,res){
    console.dir(adminRouter.controller.sectionManager);
    res.statusCode = 200;
    res.writeHead('content-type','application/json; charset=utf8');
    res.end(adminRouter.controller.sectionManager.toString());
});

adminRouter.always(function(req,res){
        showError(req,res,new Error("Not Found"),404);
});

export default adminRouter;
