
"use strict"

import router from '../flat-lib/server/router.js';

var signinRouter = new router();

signinRouter.use(function(req,res,next){
    //check if the user has a logged in session
    var ses = signinRouter.controller.sessionManager.getSession(req);
    if(ses !== null){
        if(ses.sesData.username){
            res.redirect('/flat-admin');
        } else {
            next();
        }
    } else {
        next();
    }
});

signinRouter.get('/flat-login',function(req,res){
    res.sendStatic('signin.html');
});

signinRouter.post('/flat-login',function(req,res){
    var username = req.body.username;
    var pass = req.body.password;
    var user = signinRouter.controller.userManager.findByParam('username',username);
    if(user === null){ 
        res.statusCode = 500;
        res.setHeader('content-type','text/html; charset=utf8');
        res.end('<h1>No User Found</h1>');
    } else {
        if(!user.auth(pass)){
            res.statusCode = 500;
            res.setHeader('content-type','text/html; charset=utf8');
            res.end('<h1>No User Found</h1>');
        } else {
            //set session
            var sesData = {'username':username};
            signinRouter.controller.sessionManager.create(req,res,sesData,function(err,done){
                if(err){
                    res.statusCode = 500;
                    res.setHeader('content-type','text/html; charset=utf8');
                    res.end('<h1>Unable to create session</h1>');
                } else {
                    res.redirect('/flat-admin');
                }
            });


        }
    }
});



export default signinRouter;