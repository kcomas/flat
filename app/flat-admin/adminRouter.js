
"use strict"

import fs from 'fs';
import router from '../flat-lib/server/router.js';
import pages from './pages.js';
import pageManager from './page/pageManager.js';

var adminRouter = new router();
var manager = new pageManager(pages);

adminRouter.use(function(req,res,next){
   if(req.method === 'GET'){
        manager.load(req.url,{key:'value'},function(err,page){
            if(err){
                res.statusCode = 404;
                res.setHeader('Content-Type','application/json; charset=utf8');
                res.end(JSON.stringify(err));
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

adminRouter.post('/flat-admin/renderAll',function(req,res){
    var err = manager.renderAll();
    if(err.length > 0){
        res.statusCode = 500;
        res.setHeader('Content-Type','application/json; charset=utf8');
        res.end(JSON.stringify(err));
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html; charset=utf8');
        res.end(page);
    }
});

adminRouter.always(function(req,res){
        res.statusCode = 404;
        res.setHeader('Content-Type','application/json; charset=utf8');
        res.end(JSON.stringify({status:"Not Found"}));
});

export default adminRouter;
