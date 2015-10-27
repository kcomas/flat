
"use strict"

import router from '../flat-lib/server/router.js';

var signinRouter = new router();

signinRouter.use(function(req,res,next){
    //check if the user has a logged in session
});

signinRouter.get('/flat-login',function(req,res){
    res.sendStatic('signin.html');
});

signinRouter.post('/flat-login',function(req,res){
    var username = req.body.username;
    var pass = req.body.pass;
    var user = signinRouter.controller.userManager.findByParam('username',username);
    if(user === null){ 
        res.setHeader = 500;
        res.setHeader('content-type','text/html; charset=utf8');
        res.end('<h1>No User Found</h1>');
    } else {
        if(!user.auth(pass)){
            res.setHeader = 500;
            res.setHeader('content-type','text/html; charset=utf8');
            res.end('<h1>No User Found</h1>');
        } else {
            //set session
        }
    }
});



export default signinRouter;
