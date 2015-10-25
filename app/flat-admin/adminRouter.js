
"use strict"

import fs from 'fs';
import router from '../flat-lib/server/router.js';
import pages from './pages.js';
import pageManager from './page/pageManager.js';
import mimeType from '../flat-lib/helpers/mime.js'
import writeFile from '../flat-lib/helpers/writeFile.js');

var adminRouter = new router();

//load the admin config
adminRouter.loadConfig('./flat-config/adminConfig.json');

checkDirs(adminRouter.get('upload'));

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
 * Make sure directories exist
 * @param {object} dirs - the directories to check
 * @property {string} key - the app name of the direcotry
 * @property {string} directory - the directory to make sure is there
 */
function checkDirs(obj){
    for(let keys in obj){
        if(!fs.existsSync(obj[key])){
            fs.mkdirSync(obj[key]);
        }
    }
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
    try {
        JSON.parse(layout);
    } catch(err){
        showError(req,res,err,500);
        return;
    }
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
});

//delete template
adminRouter.post('/flat-admin/remove-template',function(req,res){
    var item = adminRouter.controller.templateManager.removeByParam('name',req.body.name,function(err,done){
        if(err){
            showError(req,res,err,500);
        } else {
            showSuccess(req,res,"item deleted",200);
        }
    });

});

//list all of the pages
adminRouter.post('/flat-admin/list-pages',function(req,res){
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf8');
    res.end(adminRouter.controller.pageManager.toString());
});

//delete page
adminRouter.post('/flat-admin/remove-page',function(req,res){
    var item = adminRouter.controller.pageManager.removeByParam('permalink',req.body.permalink,function(err,done){
        if(err){
            showError(req,res,err,500);
        } else {
            showSuccess(req,res,"item deleted",200);
        }
    });
});

//add update a page
adminRouter.post('/flat-admin/upsert-page',function(req,res){
    var permalink = req.body.permalink
    var def = req.body.def;
    var template = req.body.template;
    var page = adminRouter.controller.pageManager.findByParam('permalink',permalink);
    if(page === null){
        adminRouter.controller.pageManager.create(permalink,def,template,function(err,done){
            if(err){
                showError(req,res,err,500);
            } else {
                showSuccess(req,res,'update/saved',200);
            }
        });
    } else {
        page.upsert({'def':def,'template':template},function(err,done){
            if(err){
                showError(req,res,err,500);
            } else {
                showSuccess(req,res,'update/saved',200);
            }
        });
    }
});

//upload a file
adminRouter.post('/flat-admin/upload',function(req,res){
    var name = req.body.name;
    if(req.body.private === 'true'){
        var pri = true;
        var dir = adminRouter.get('upload').private;
    } else {
        var pri = false;
        var dir = adminRouter.get('upload').public;
    }
    var mime = mimeType(req.body.files.fileData.filename);
    var upload = adminRouter.controller.uploadManager.findByParam('name',name);
    if(upload === null){
        adminRouter.controller.uploadManager.create(name,req.body.files.fileData.filename,pri,mime,function(err,done){
            if(err){
                showError(req,res,err,500);
            } else {
                writeFile(dir,req.body.files.fileData.filename,req.body.files.fileData.data,function(err,done){
                    if(err){
                        showError(req,res,err,500);
                    } else {
                        showSuccess(req,res,'file saved',200);
                    }
                });
            }
        });
    } else {
        upload.upsertAndMime({'private':pri,'filename':req.body.files.fileData.filename,'mime':mime},function(err,done){
            if(err){
                showError(req,res,err,500);
            } else {
                writeFile(dir,req.body.files.fileData.filename,req.body.files.fileData.data,function(err,done){
                    if(err){
                        showError(req,res,err,500);
                    } else {
                        showSuccess(req,res,'file saved',200);
                    }
                });
            }
        });
    }
});

adminRouter.always(function(req,res){
        showError(req,res,new Error("Not Found"),404);
});

export default adminRouter;
