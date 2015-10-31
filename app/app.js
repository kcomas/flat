
"use strict"

import http from 'http';
import server from './flat-lib/server/server.js';
import configManager from './flat-lib/config/config.js';

import auth from './flat-admin/helpers/auth.js';
import adminRouter from './flat-admin/adminRouter.js';
import sectionRouter from './flat-admin/routers/section.js';
import fileRouter from './flat-admin/routers/file.js';
import pageRouter from './flat-admin/routers/page.js';
import templateRouter from './flat-admin/routers/template.js';
import userRouter from './flat-admin/routers/user.js';
import blogRouter from './flat-admin/routers/blog.js'

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
import blogManager from './flat-lib/blog/blogManager.js';
import controller from './flat-lib/controller.js';

import flatLog from './flat-lib/helpers/flatLog.js';

const app = new server();

const config = new configManger('./flat-config/config.json');

const pm = new pageManager(config.getValue('pageDir'));

const sm = new sectionManager(config.getValue('sectionDir'));

const ses = new sessionManager(config.getValue('sessionDir'));

const tm = new templateManager(config.getValue('templateDir'));

const usm = new userManager(config.getValue('userDir'));

const cm = new cacheManager(config.getValue('cacheDir'));

const um = new uploadManager(config.getValue('uploadDir'));

const bm = new blogManager(config.getValue('blogDir'));

const controll = new controller(pm,sm,ses,tm,usm,cm,um,bm,config); 
controll.init();

const logger = new flatLog(config.getValue('logDir'),config.getValue('logToConsole'));

app.use(logger.log());

app.use((req,res,next)=>{
    req.sessionCookieName = config.getValue('sessionCookie');
    req.sessionCookieTime = 1000 * 60 * 60 * 24 * parseInt(config.getValue('sessionTime'));
    next();
});

/**
 * The array of routes required for auth
 * @type {string}
 */
var authRoutes = ['/flat-admin','/flat-debug'];

app.use(auth(controll,authRoutes));

app.route('/',mainRouter.run(controll));

app.route('/flat-login',signinRouter.run(controll));

app.route('/flat-install',installRouter.run(controll));

app.route('/flat-admin',adminRouter.run(controll));
app.route('/flat-admin/file/',fileRouter.run(controll));
app.route('/flat-admin/page/',pageRouter.run(controll));
app.route('/flat-admin/section/',sectionRouter.run(controll));
app.route('/flat-admin/template/',templateRouter.run(controll));
app.route('/flat-admin/user/',userRouter.run(controll));
app.route('/flat-admin/blog/',blogRouter.run(controll));

app.route('/flat-debug',debugRouter.run(controll));

app.always((req,res)=>{
    res.statusCode = 404;
    res.setHeader('Content-Type','text/html; charset=utf8');
    res.end('<h1>404</h1>');
});

http.createServer(app.run()).listen(config.getValue('port'));
console.log("Server Started");
