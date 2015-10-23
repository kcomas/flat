
"use strict"

import fs from 'fs';
import router from '../flat-lib/server/router.js';
import pages from './pages.js';
import pageManager from './page/pageManager.js';

var adminRouter = new router();
var manager = new pageManager(pages);

//show better json errors
Object.defineProperty(Error.prototype, 'toJSON', {
        value: function () {
            var alt = {};
            Object.getOwnPropertyNames(this).forEach(function (key) {
                alt[key] = this[key];
                }, this);
            return alt;
                    },
        configurable: true
});

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

/**
 * Show a sucess as html string
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {string} msg - the html message
 * @param {number} status - the status code
 */
function showSuccess(req,res,msg,status){
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html; charset=utf8');
    res.end(msg);
}

adminRouter.use(function(req,res,next){
   var reg = new RegExp('^/flat-admin$|^/flat-admin/');
   if(req.method === 'GET'){
        manager.load(req.url.replace(reg,'/'),{key:'value'},function(err,page){
            if(err){
                showError(req,res,err,404);
            } else {
                showSuccess(req,res,page,200);
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
        showSuccess(req,res,"Page Created",200);
    }
});

//render all of the the admin pages
adminRouter.post('/flat-admin/renderAll',function(req,res){
    var err = manager.renderAll();
    if(err.length > 0){
        showError(req,res,err,500);
    } else {
        showSuccess(req,res,"Pages Created",200);
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
            } else {
                showSuccess(req,res,"updated/saved",200);
            }
        });
    } else {
        section.upsert({'layout':content},function(err,done){
            if(err){
                showerror(req,res,err,500);
            }
            showSuccess(req,res,"updated/saved",200);
        });
    }
});

//list all of the sections
adminRouter.post('/flat-admin/list-sections',function(req,res){
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf8');
    res.end(adminRouter.controller.sectionManager.toString());
});

//delete section
adminRouter.post('/flat-admin/remove-section',function(req,res){
    var item = adminRouter.controller.sectionManager.removeByParam('name',req.body.name,function(err,done){
        if(err){
            showError(req,res,err,500);
        } else {
            showSuccess(req,res,"item deleted",200);
        }
    });

});

//add update a template
adminRouter.post('/flat-admin/upsert-template',function(req,res){
    var name = req.body.name;
    var layout = req.body.layout;
    var template = adminRouter.controller.templateManager.findByParam('name',name);
    if(template === null){
        adminRouter.controller.templateManager.create(name,layout,function(err,done){
            if(err){
                showError(req,res,err,500);
            } else {
                showSuccess(req,res,'update/saved',200);
            }
        });
    } else {
        template.upsert({'layout':layout},function(err,done){
            if(err){
                showError(req,res,err,500);
            } else {
                showSuccess(req,res,'update/saved',200);
            }
        });
    }
});

//list all of the templates
adminRouter.post('/flat-admin/list-templates',function(req,res){
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf8');
    res.end(adminRouter.controller.templateManager.toString());
})
;
adminRouter.always(function(req,res){
        showError(req,res,new Error("Not Found"),404);
});

export default adminRouter;
