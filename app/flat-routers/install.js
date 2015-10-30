
"use strict"

//install router only used to create a user at first load

import router from '../flat-lib/server/router.js';

const installRouter = new router();

//load the install config
installRouter.loadConfig('./flat-config/installConfig.json');

installRouter.use((req,res,next)=>{
    if(installRouter.getValue('installed') === 'yes'){
        //redirect to index
        res.redirect('/flat-login');
    } else {
        next();
    }
});

//get the install page
installRouter.get('/flat-install',(req,res)=>{
    res.sendStatic('install.html');
});

installRouter.post('/flat-install',(req,res)=>{
    var username = req.body.username;
    var email = req.body.email;
    var pass = req.body.password;
    installRouter.controller.userManager.create(username,email,pass,(err,done)=>{
        if(err){
            console.dir(err);
            res.statusCode = 500;
            res.setHeader('content-type','text/html; charset=utf8');
            res.end('Failed To Install');
        } else {
           installRouter.setValue('installed','yes');
           installRouter.writeConfig('./flat-config/installConfig.json');
           res.redirect('/flat-login');
        }
    });
});

installRouter.always((req,res)=>{
    res.statusCode = 404;
    res.setHeader('content-type','text/html; charset=utf-8');
    res.end('<h1>Not Found</h1>');
});


export default installRouter;
