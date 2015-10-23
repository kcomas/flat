
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

var pm = new pageManager(app.get('pageDir'));
pm.init();

var sm = new sectionManager(app.get('sectionDir'));
sm.init();

var ses = new sessionManager(app.get('sessionDir'));
ses.init();

var tm = new templateManager(app.get('templateDir'));
tm.init();

var um = new userManager(app.get('userDir'));
um.init();

var controll = new controller(pm,sm,ses,tm,um); 

app.controller = controll;
adminRouter.controller = controll;

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
