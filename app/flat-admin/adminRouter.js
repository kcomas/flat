"use strict"

import router from '../flat-lib/server/router.js';
import pages from './pages.js';
import pageManager from './page/pageManager.js';
import auth from './helpers/auth.js';
import showError from './helpers/showError.js';
import showSuccess from './helpers/showSuccess.js';

var adminRouter = new router();

var manager = new pageManager(pages);

//load all of the pages into memory
var renderErr = manager.renderAll();
if(renderErr.length > 0){
    console.dir(renderErr);
}

console.dir(auth.controller);

//auth
adminRouter.use(auth(adminRouter.controller.sessionManager,adminRouter.controller.userManager));

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

//logout
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


adminRouter.always((req,res)=>{
        showError(req,res,new Error("Not Found"),404);
});

export default adminRouter;
