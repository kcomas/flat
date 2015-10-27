
"use strict"

//install router only used to create a user at first load

import router from '../flat-lib/server/router.js';

var installRouter = new router();

//load the install config
installRouter.loadConfig('./flat-config/installConfig.json');

installRouter.use(function(req,res,next){
    if(installRouter.get('installed') === 'true'){
        //redirect to index
        res.redirect('/');
    } else {
        next();
    }
});

//get the install page
installRouter.get('/flat-install',function(req,res){
    res.sendStatic('install.html');
});

installRouter.always(function(req,res){
    res.statusCode = 404;
    res.setHeader('content-type','text/html; charset=utf-8');
    res.end('<h1>Not Found</h1>');
});


export default installRouter;
