
"use strict"

import http from 'http';
import server from './flat-lib/server/server.js';
import controll from './init.js';
import flatLog from './flat-lib/helpers/flatLog.js';
import auth from './flat-admin/helpers/auth.js';

import adminRouter from './flat-admin/adminRouter.js';
import sectionRouter from './flat-admin/routers/section.js';
import fileRouter from './flat-admin/routers/file.js';
import pageRouter from './flat-admin/routers/page.js';
import templateRouter from './flat-admin/routers/template.js';
import userRouter from './flat-admin/routers/user.js';
import blogRouter from './flat-admin/routers/blog.js'
import indexRouter from './flat-admin/routers/index.js';

import mainRouter from './flat-routers/index.js';
import installRouter from './flat-routers/install.js';
import signinRouter from './flat-routers/signin.js';
import debugRouter from './flat-routers/debug.js';
import blogRouter from './flat-routers/blog.js';

const app = new server();

const logger = new flatLog(controll.config.getValue('logDir'),controll.config.getValue('logToConsole'));

app.use(logger.log());

app.use((req,res,next)=>{
    req.sessionCookieName = controll.config.getValue('sessionCookie');
    req.sessionCookieTime = 1000 * 60 * 60 * 24 * parseInt(controll.config.getValue('sessionTime'));
    next();
});

/**
 * The array of routes required for auth
 * @type {string}
 */
var authRoutes = ['/flat-admin','/flat-debug'];

app.use(auth(controll,authRoutes));

app.route('/',mainRouter.run(controll));

app.route('/blog',blogRouter.run(controll));

app.route('/flat-login',signinRouter.run(controll));

app.route('/flat-install',installRouter.run(controll));

app.route('/flat-debug',debugRouter.run(controll));

app.route('/flat-admin',adminRouter.run(controll));
app.route('/flat-admin/file/',fileRouter.run(controll));
app.route('/flat-admin/page/',pageRouter.run(controll));
app.route('/flat-admin/section/',sectionRouter.run(controll));
app.route('/flat-admin/template/',templateRouter.run(controll));
app.route('/flat-admin/user/',userRouter.run(controll));
app.route('/flat-admin/blog/',blogRouter.run(controll));
app.route('/flat-admin/index/',indexRouter.run(controll));

app.always((req,res)=>{
    res.statusCode = 404;
    res.setHeader('Content-Type','text/html; charset=utf8');
    res.end('<h1>404</h1>');
});

http.createServer(app.run()).listen(controll.config.getValue('port'));
console.log("Server Started");
