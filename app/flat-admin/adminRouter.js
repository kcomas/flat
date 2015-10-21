
"use strict"

import fs from 'fs';
import router from '../flat-lib/server/router.js';
import pages from './pages.js';
import pageManager from './page/pageManager.js';

var adminRouter = new router();
var manager = new pageManager(pages);


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
   if(req.method === 'GET'){
        manager.load(req.url,{key:'value'},function(err,page){
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

adminRouter.post('/flat-admin/render',function(req,res){
    console.dir(req.body);
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

adminRouter.always(function(req,res){
        showError(req,res,new Error("Not Found"),404);
});

export default adminRouter;
