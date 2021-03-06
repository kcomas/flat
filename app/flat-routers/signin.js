
"use strict"

import router from '../flat-lib/server/router.js';

const signinRouter = new router();

signinRouter.use((req,res,next)=>{
    //check if the user has a logged in session
    var ses = signinRouter.controller.sessionManager.getSession(req);
    if(ses !== null){
        if(ses.getData('username')){
            res.redirect('/flat-admin');
        } else {
            next();
        }
    } else {
        next();
    }
});

signinRouter.use((req,res,next)=>{
    if(signinRouter.controller.config.getValue('installed') !== 'yes'){
        //redirect to index
        res.redirect('/flat-install');
    } else {
        next();
    }
});

signinRouter.get('/flat-login',(req,res)=>{
    res.sendStatic('./flat-static/signin.html');
});

signinRouter.post('/flat-login',(req,res)=>{
    var username = req.body.username;
    var pass = req.body.password;
    res.statusCode = 500;
    res.setHeader('content-type','text/html; charset=utf8');   
    var user = signinRouter.controller.userManager.findByParam('username',username);
    if(user === null){ 
        res.end('<h1>No User Found</h1>');
        return;
    }
    if(!user.auth(pass)){
        res.end('<h1>Pass auth failed</h1>');
        return;
    }
    //set session
    var sesData = {'username':username};
    signinRouter.controller.sessionManager.create(req,res,sesData,(err,done)=>{
        if(err){
            res.end('<h1>Unable to create session</h1>');
        } else {
            //add to the last login
            var info = signinRouter.controller.info.data; 
            info.lastLogin[username] = new Date();
            res.redirect('/flat-admin');
        }
    });
});

signinRouter.always((req,res)=>{
    res.statusCode = 404;
    res.setHeader('content-type','text/html; charset=utf-8');
    res.end('<h1>Not Found</h1>');
});   

export default signinRouter;
