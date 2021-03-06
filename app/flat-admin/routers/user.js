
"use strict"

import router from '../../flat-lib/server/router.js';
import showError from '../helpers/showError.js';
import showSuccess from '../helpers/showSuccess.js';

const userRouter = new router();

//get the cuurent user
userRouter.post('/flat-admin/user/current',(req,res)=>{            
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json; charset=utf8');
    res.end(req.user.toString());
});

//update the current user
userRouter.post('/flat-admin/user/current/update',(req,res)=>{
    var email = req.body.email;
    var changePass = req.body.changePass;
    var passA = req.body.passA;
    var passB = req.body.passB;
    req.user.upsert({'email':email},(err,done)=>{
        if(err){
            showError(req,res,err,500);
            return;
        }
        if(changePass === true){
            if(passA === passB){
                req.user.password(passA,(err,done)=>{
                    if(err){
                        showError(req,res,err,500);
                        return;
                    }
                    showSuccess(req,res,"Email/Password Updated",200);
                });
            } else {
                showError(req,res,new Error("Passwords Do Not Match"),500);
            }
        } else {
            showSuccess(req,res,"Email Updated",200);
        }
    });
});

//list all of the users
userRouter.post('/flat-admin/user/list',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf8');
    res.end(userRouter.controller.userManager.toString());
});

//add a new user
userRouter.post('/flat-admin/user/add',(req,res)=>{
    var username = req.body.username;
    var email = req.body.email;
    var passA = req.body.passA;
    var passB = req.body.passB;
    if(passA !== passB){
        showError(req,res,new Error("Passwords Do Not Match"),500);
        return;
    }
    userRouter.controller.userManager.create(username,email,passA,(err,done)=>{
        if(err){
            showError(req,res,err,500);
            return;
        }
        showSuccess(req,res,"User Created",200);
    });
});


userRouter.always((req,res)=>{
    showError(req,res,new Error("Not Found"),404);
});

export default userRouter;
