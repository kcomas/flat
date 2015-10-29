"use strict"

import router from '../flat-lib/server/router.js';
import pages from './pages.js';
import pageManager from './page/pageManager.js';
import uploadedFiles from '../flat-lib/helpers/uploadedFiles.js';
import pageRender from '../flat-lib/helpers/pageRender.js';

var adminRouter = new router();

//load the admin config
adminRouter.loadConfig('./flat-config/adminConfig.json');

var uploadDirs = adminRouter.getValue('upload')

var uploader = new uploadedFiles(uploadDirs.public,uploadDirs.private);

var manager = new pageManager(pages);

//show better json errors
Object.defineProperty(Error.prototype, 'toJSON', {
    value: function () {
        var alt = {};
        Object.getOwnPropertyNames(this).forEach((key)=>{
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

adminRouter.use((req,res,next)=>{
    //check if the user has a logged in session
    var ses = adminRouter.controller.sessionManager.getSession(req);
    if(ses !== null){
        if(ses.getData('username')){
            req.session = ses;
            var user = adminRoiter.controller.userManager.findByParam(ses.getData('username'));
            if(user === null){
                res.redirect('/flat-login');
                return;
            }
            req.user = user;
            next();
        } else {
            res.redirect('/flat-login');
        }       
    } else {
        res.redirect('/flat-login');
    }
});

/**
 * List of get routes not to auto lookup
 * @type {array}
 */
var denyList = ['/flat-admin/logout'];

/**
 * Length of the deny list
 * @type {number}
 */
var denyListLength = denyList.length;

/**
 * Check if a url is in the deny list
 * @param {string} url - the url to check
 * @return {boolean} true if the url is not in the deny list
 */
function isAllowed(url){
    for(let i=0; i<denyListLength; i++){
        if(url === denyList[i]){
            return false;
        }
    }
    return true;
}

/**
 * The expression to check the urls in the next use
 * @type {regexp}
 */
var urlReg = new RegExp('^/flat-admin$|^/flat-admin/');

adminRouter.use((req,res,next)=>{
   if(req.method === 'GET' && isAllowed(req.url)){
        manager.load(req.url.replace(urlReg,'/'),{key:'value'},(err,page)=>{
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

adminRouter.get('/flat-admin/logout',(req,res)=>{
    adminRouter.controller.sessionManager.destroy(req,res,(err,done)=>{
        if(err){
            showError(req,res,err,500);
            return;
        }
        res.redirect('/flat-login');
    });
});

//render a single admin page
adminRouter.post('/flat-admin/render',(req,res)=>{
    var page = req.body.page;
    var err = manager.render(page);
    if(err){
        showError(req,res,err,500);
    } else {
        showSuccess(req,res,"Page Created",200);
    }
});

//render all of the the admin pages
adminRouter.post('/flat-admin/renderAll',(req,res)=>{
    var err = manager.renderAll();
    if(err.length > 0){
        showError(req,res,err,500);
    } else {
        showSuccess(req,res,"Pages Created",200);
    }
});

//add/update a section to the sectionManager
adminRouter.post('/flat-admin/upsert-section',(req,res)=>{
    var name = req.body.name;
    var content = req.body.content;
    //find if it exists
    var section = adminRouter.controller.sectionManager.findByParam('name',name);
    if(section === null){
        adminRouter.controller.sectionManager.create(name,content,(err,done)=>{
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
adminRouter.post('/flat-admin/list-sections',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf8');
    res.end(adminRouter.controller.sectionManager.toString());
});

//delete section
adminRouter.post('/flat-admin/remove-section',(req,res)=>{
    var item = adminRouter.controller.sectionManager.removeByParam('name',req.body.name,(err,done)=>{
        if(err){
            showError(req,res,err,500);
        } else {
            showSuccess(req,res,"item deleted",200);
        }
    });

});

//add update a template
adminRouter.post('/flat-admin/upsert-template',(req,res)=>{
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
        adminRouter.controller.templateManager.create(name,layout,(err,done)=>{
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
adminRouter.post('/flat-admin/list-templates',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf8');
    res.end(adminRouter.controller.templateManager.toString());
});

//delete template
adminRouter.post('/flat-admin/remove-template',(req,res)=>{
    var item = adminRouter.controller.templateManager.removeByParam('name',req.body.name,(err,done)=>{
        if(err){
            showError(req,res,err,500);
        } else {
            showSuccess(req,res,"item deleted",200);
        }
    });

});

//load a private file
adminRouter.post('/flat-admin/load-private',(req,res)=>{
    var filename = req.body.filename;
    var item = adminRouter.controller.uploadManager.findByManyParams({'fileName':filename,'private':true});
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

//list all of the pages
adminRouter.post('/flat-admin/list-pages',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf8');
    res.end(adminRouter.controller.pageManager.toString());
});

//delete page
adminRouter.post('/flat-admin/remove-page',(req,res)=>{
    adminRouter.controller.pageManager.removeByParam('permalink',req.body.permalink,(err,done)=>{
        if(err){
            showError(req,res,err,500);
        } else {
            //delete the cached page if it exists
            adminRouter.controller.cacheManager.removeByParam('permalink',req.body.permalink,(err,done)=>{
                showSuccess(req,res,"item deleted",200);
            });
        }
    });
});

//add update a page
adminRouter.post('/flat-admin/upsert-page',(req,res)=>{
    var permalink = req.body.permalink
    var def = req.body.def;
    var template = req.body.template;
    var page = adminRouter.controller.pageManager.findByParam('permalink',permalink);
    if(page === null){
        adminRouter.controller.pageManager.create(permalink,def,template,(err,done)=>{
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
adminRouter.post('/flat-admin/page-render',(req,res)=>{
    var permalink = req.body.permalink;
    var page = adminRouter.controller.pageManager.findByParam('permalink',permalink);
    if(page === null){
        showError(req,res,new Error('No Page Found'),500);
    } else {
        //find the page template
        var template = adminRouter.controller.templateManager.findByParam('name',page.get('template'));
        if(template === null){
            showError(req,res,new Error('Page Template Not Found'),500);
        } else {
            var cache = adminRouter.controller.cacheManager.findByParam('permalink',permalink);
            var fileStr = pageRender(page.get('def'),template.get('layout'));
            if(cache === null){
                //create
                adminRouter.controller.cacheManager.create(permalink,fileStr,(err,done)=>{
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

//upload a file
adminRouter.post('/flat-admin/upload',(req,res)=>{
    if(req.body.private === 'true'){
        var pri = true;
    } else {
        var pri = false;
    }
    var mType = uploadedFiles.mimeType(req.body.files.fileData.filename);
    var upload = adminRouter.controller.uploadManager.findByParam('fileName',req.body.files.fileData.filename);
    if(upload === null){
        adminRouter.controller.uploadManager.create(req.body.files.fileData.filename,pri,mType,(err,done)=>{
            if(err){
                showError(req,res,err,500);
            } else {
                uploader.writeFile(pri,req.body.files.fileData.filename,mType,req.body.files.fileData.data,(err,done)=>{
                    if(err){
                        showError(req,res,err,500);
                    } else {
                        showSuccess(req,res,'file saved',200);
                    }
                });
            }
        });
    } else {
        upload.upsert({'private':pri,'fileName':req.body.files.fileData.filename,'mime':mType},(err,done)=>{
            if(err){
                showError(req,res,err,500);
            } else {
                uploader.writeFile(pri,req.body.files.fileData.filename,mType,req.body.files.fileData.data,(err,done)=>{
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

//list all of the files
adminRouter.post('/flat-admin/list-files',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf8');
    res.end(adminRouter.controller.uploadManager.toString());
});

//list the private files
adminRouter.post('/flat-admin/list-files/private',(req,res)=>{
    var privateItems = adminRouter.controller.uploadManager.findManyByParam('private',true);
    var str = '[';
    privateItems.forEach((item)=>{
        str += item.toString();
    });
    str += ']';
    //str = str.replace(/,(?=[^,]*$)/, '');
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf-8');
    res.end(str);
});


//remove a file
adminRouter.post('/flat-admin/remove-upload',(req,res)=>{
    var filename = req.body.name;
    adminRouter.controller.uploadManager.removeByParam('fileName',filename,(err,itemArr)=>{
        if(err){
            showError(req,res,err,500);
        } else {
            uploader.removeFile(itemArr[0].get('private'),itemArr[0].get('fileName'),(err,done)=>{
                if(err){
                    showError(req,res,err,500);
                } else {
                    showSuccess(req,res,'file deleted',200);
                }
            });
        }
    });
});

//get the upload dirs
adminRouter.post('/flat-admin/upload/dirs',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json; charset=utf8');
    res.end(JSON.stringify(uploadDirs));
});

//get the cuurent user
adminRouter.post('/flat-admin/current-user',(req,res)=>{            
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json; charset=utf8');
    res.end(JSON.stringify(req.user));
});

adminRouter.always((req,res)=>{
        showError(req,res,new Error("Not Found"),404);
});

export default adminRouter;
