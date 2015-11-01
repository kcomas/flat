
"use strict"

import router from '../../flat-lib/server/router.js';
import showError from '../helpers/showError.js';
import showSuccess from '../helpers/showSuccess.js';
import uploadedFiles from '../../flat-lib/helpers/uploadedFiles.js';

const fileRouter = new router();

//upload a file
fileRouter.post('/flat-admin/file/upload',(req,res)=>{
    if(req.body.private === 'true'){
        var pri = true;
    } else {
        var pri = false;
    }
    var mType = uploadedFiles.mimeType(req.body.files.fileData.filename);
    var upload = fileRouter.controller.uploadManager.findByParam('fileName',req.body.files.fileData.filename);
    if(upload === null){
        fileRouter.controller.uploadManager.create(req.body.files.fileData.filename,pri,mType,(err,done)=>{
            if(err){
                showError(req,res,err,500);
            } else {
                fileRouter.controller.uploader.writeFile(pri,req.body.files.fileData.filename,mType,req.body.files.fileData.data,(err,done)=>{
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
                fileRouter.controller.uploader.writeFile(pri,req.body.files.fileData.filename,mType,req.body.files.fileData.data,(err,done)=>{
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
fileRouter.post('/flat-admin/file/list',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json; charset=utf8');
    res.end(fileRouter.controller.uploadManager.toString());
});

//list the private files
fileRouter.post('/flat-admin/file/list/private',(req,res)=>{
    var privateItems = fileRouter.controller.uploadManager.findManyByParam('private',true);
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
fileRouter.post('/flat-admin/file/remove',(req,res)=>{
    var filename = req.body.name;
    fileRouter.controller.uploadManager.removeByParam('fileName',filename,(err,itemArr)=>{
        if(err){
            showError(req,res,err,500);
        } else {
            fileRouter.controller.uploader.removeFile(itemArr[0].get('private'),itemArr[0].get('fileName'),(err,done)=>{
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
fileRouter.post('/flat-admin/file/dirs',(req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json; charset=utf8');
    var obj = {};
    obj.private = fileRouter.controller.uploader.privateDir;
    obj.public = fileRouter.controller.uploader.publicDir;
    res.end(JSON.stringify(obj));
});

fileRouter.always((req,res)=>{
    showError(req,res,new Error("Not Found"),404);
});

export default fileRouter;
