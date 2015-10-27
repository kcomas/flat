
"use strict"

import http from 'http';
import server from './flat-lib/server/server.js';
import adminRouter from './flat-admin/adminRouter.js';
import mainRouter from './flat-routers/index.js';

import pageManager from './flat-lib/page/pageManager.js';
import sectionManager from './flat-lib/section/sectionManager.js';
import sessionManager from './flat-lib/session/sessionManager.js';
import templateManager from './flat-lib/template/templateManager.js';
import userManager from './flat-lib/user/userManager.js'
import cacheManager from './flat-lib/cache/cacheManager.js';
import uploadManager from './flat-lib/upload/uploadManager.js';
import controller from './flat-lib/controller.js';
import flatLog from './flat-lib/helpers/flatLog.js';

var app = new server();

app.loadConfig('./flat-config/config.json');

var pm = new pageManager(app.get('pageDir'));

var sm = new sectionManager(app.get('sectionDir'));

var ses = new sessionManager(app.get('sessionDir'));

var tm = new templateManager(app.get('templateDir'));

var usm = new userManager(app.get('userDir'));

var cm = new cacheManager(app.get('cacheDir'));

var um = new uploadManager(app.get('uploadDir'));

var controll = new controller(pm,sm,ses,tm,usm,cm,um); 
controll.init();

var logger = new flatLog(app.get('logDir'),true);

app.use(logger.log());

app.use(function(req,res,next){
    req.sessionCookieName = app.get('sessionCookie');
    next();
});

app.use(function(req,res,next){
    //stop server
    console.log("in app func");
});

app.route('/',mainRouter.run(controll));

app.route('/flat-admin',adminRouter.run(controll));

app.always(function(req,res){
    res.statusCode = 404;
    res.setHeader('Content-Type','text/html; charset=utf8');
    res.end('<h1>404</h1>');
});

http.createServer(app.run()).listen(app.get('port'));
console.log("Server Started");
