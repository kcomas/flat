
"use strict"

import http from 'http';
import server from './flat-lib/server/server.js';
import adminRouter from './flat-admin/adminRouter.js';

import pageManager from './flat-lib/page/pageManager.js';
import sectionManager from './flat-lib/section/sectionManager.js';
import sessionManager from './flat-lib/session/sessionManager.js';
import templateManager from './flat-lib/template/templateManager.js';
import userManager from './flat-lib/user/userManager.js'
import controller from './flat-lib/controller.js';

var app = new server();

app.loadConfig('./flat-config/config.json');

var conttroll = new controller(new pageManager(app.get('pageDir')),new sectionManager(app.get('sectionDir')),new sessionManager(app.get('sessionDir')),new templateManager(app.get('templateDir')),new userManager(app.get('userDir'))); 

app.controller = controll;

console.dir(app.controller);

app.use(function(req,res,next){
    req.sessionCookieName = app.get('sessionCookie');
});

app.route('/flat-admin',adminRouter.run());

app.always(function(req,res){
    res.statusCode = 404;
    res.setHeader('Content-Type','text/html; charset=utf8');
    res.end('<h1>404</h1>');
});

http.createServer(app.run()).listen(app.get('port'));
console.log("Server Started");
