
"use strict"

import http from 'http';
import server from './flat-lib/server/server.js';

import adminRouter from './flat-admin/adminRouter.js';
import sectionRouter from './flat-admin/routers/section.js';
import fileRouter from './flat-admin/routers/file.js';
import pageRouter from './flat-admin/routers/page.js';
import templateRouter from './flat-admin/routers/template.js';
import userRouter from './flat-admin/routers/user.js';

import mainRouter from './flat-routers/index.js';
import installRouter from './flat-routers/install.js';
import signinRouter from './flat-routers/signin.js';
import debugRouter from './flat-routers/debug.js';

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

var pm = new pageManager(app.getValue('pageDir'));

var sm = new sectionManager(app.getValue('sectionDir'));

var ses = new sessionManager(app.getValue('sessionDir'));

var tm = new templateManager(app.getValue('templateDir'));

var usm = new userManager(app.getValue('userDir'));

var cm = new cacheManager(app.getValue('cacheDir'));

var um = new uploadManager(app.getValue('uploadDir'));

var controll = new controller(pm,sm,ses,tm,usm,cm,um); 
controll.init();

//console.dir(controll);

var logger = new flatLog(app.getValue('logDir'),true);

app.use(logger.log());

app.use((req,res,next)=>{
    req.sessionCookieName = app.getValue('sessionCookie');
    req.sessionCookieTime = 1000 * 60 * 60 * 24 * parseInt(app.getValue('sessionTime'));
    next();
});

app.route('/',mainRouter.run(controll));

app.route('/flat-login',signinRouter.run(controll));

app.route('/flat-install',installRouter.run(controll));

app.route('/flat-admin',adminRouter.run(controll));
app.route('/flat-admin/file',fileRouter.run(controll));
app.route('/flat-admin/page',pageRouter.run(controll));
app.route('/flat-admin/section',sectionRouter.run(controll));
app.route('/flat-admin/template',templateRouter.run(controll));
app.route('/flat-admin/user',userRouter.run(controll));

app.route('/flat-debug',debugRouter.run(controll));

app.always((req,res)=>{
    res.statusCode = 404;
    res.setHeader('Content-Type','text/html; charset=utf8');
    res.end('<h1>404</h1>');
});

http.createServer(app.run()).listen(app.getValue('port'));
console.log("Server Started");
