
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _flatLibServerServerJs = require('./flat-lib/server/server.js');

var _flatLibServerServerJs2 = _interopRequireDefault(_flatLibServerServerJs);

var _initJs = require('./init.js');

var _initJs2 = _interopRequireDefault(_initJs);

var _flatLibHelpersFlatLogJs = require('./flat-lib/helpers/flatLog.js');

var _flatLibHelpersFlatLogJs2 = _interopRequireDefault(_flatLibHelpersFlatLogJs);

var _flatAdminHelpersAuthJs = require('./flat-admin/helpers/auth.js');

var _flatAdminHelpersAuthJs2 = _interopRequireDefault(_flatAdminHelpersAuthJs);

var _flatAdminAdminRouterJs = require('./flat-admin/adminRouter.js');

var _flatAdminAdminRouterJs2 = _interopRequireDefault(_flatAdminAdminRouterJs);

var _flatAdminRoutersSectionJs = require('./flat-admin/routers/section.js');

var _flatAdminRoutersSectionJs2 = _interopRequireDefault(_flatAdminRoutersSectionJs);

var _flatAdminRoutersFileJs = require('./flat-admin/routers/file.js');

var _flatAdminRoutersFileJs2 = _interopRequireDefault(_flatAdminRoutersFileJs);

var _flatAdminRoutersPageJs = require('./flat-admin/routers/page.js');

var _flatAdminRoutersPageJs2 = _interopRequireDefault(_flatAdminRoutersPageJs);

var _flatAdminRoutersTemplateJs = require('./flat-admin/routers/template.js');

var _flatAdminRoutersTemplateJs2 = _interopRequireDefault(_flatAdminRoutersTemplateJs);

var _flatAdminRoutersUserJs = require('./flat-admin/routers/user.js');

var _flatAdminRoutersUserJs2 = _interopRequireDefault(_flatAdminRoutersUserJs);

var _flatAdminRoutersBlogJs = require('./flat-admin/routers/blog.js');

var _flatAdminRoutersBlogJs2 = _interopRequireDefault(_flatAdminRoutersBlogJs);

var _flatAdminRoutersIndexJs = require('./flat-admin/routers/index.js');

var _flatAdminRoutersIndexJs2 = _interopRequireDefault(_flatAdminRoutersIndexJs);

var _flatRoutersIndexJs = require('./flat-routers/index.js');

var _flatRoutersIndexJs2 = _interopRequireDefault(_flatRoutersIndexJs);

var _flatRoutersInstallJs = require('./flat-routers/install.js');

var _flatRoutersInstallJs2 = _interopRequireDefault(_flatRoutersInstallJs);

var _flatRoutersSigninJs = require('./flat-routers/signin.js');

var _flatRoutersSigninJs2 = _interopRequireDefault(_flatRoutersSigninJs);

var _flatRoutersDebugJs = require('./flat-routers/debug.js');

var _flatRoutersDebugJs2 = _interopRequireDefault(_flatRoutersDebugJs);

var _flatRoutersBlogJs = require('./flat-routers/blog.js');

var _flatRoutersBlogJs2 = _interopRequireDefault(_flatRoutersBlogJs);

var _flatRoutersBlogListJs = require('./flat-routers/blogList.js');

var _flatRoutersBlogListJs2 = _interopRequireDefault(_flatRoutersBlogListJs);

var app = new _flatLibServerServerJs2['default']();

var logger = new _flatLibHelpersFlatLogJs2['default'](_initJs2['default'].config.getValue('logDir'), _initJs2['default'].config.getValue('logToConsole'));

app.use(logger.log());

app.use(function (req, res, next) {
    req.sessionCookieName = _initJs2['default'].config.getValue('sessionCookie');
    req.sessionCookieTime = 1000 * 60 * 60 * 24 * parseInt(_initJs2['default'].config.getValue('sessionTime'));
    next();
});

/**
 * The array of routes required for auth
 * @type {string}
 */
var authRoutes = ['/flat-admin', '/flat-debug'];

app.use((0, _flatAdminHelpersAuthJs2['default'])(_initJs2['default'], authRoutes));

app.route('/', _flatRoutersIndexJs2['default'].run(_initJs2['default']));

app.route('/blog', _flatRoutersBlogJs2['default'].run(_initJs2['default']));

app.route('/blog-list', _flatRoutersBlogListJs2['default'].run(_initJs2['default']));

app.route('/flat-login', _flatRoutersSigninJs2['default'].run(_initJs2['default']));

app.route('/flat-install', _flatRoutersInstallJs2['default'].run(_initJs2['default']));

app.route('/flat-debug', _flatRoutersDebugJs2['default'].run(_initJs2['default']));

app.route('/flat-admin', _flatAdminAdminRouterJs2['default'].run(_initJs2['default']));
app.route('/flat-admin/file/', _flatAdminRoutersFileJs2['default'].run(_initJs2['default']));
app.route('/flat-admin/page/', _flatAdminRoutersPageJs2['default'].run(_initJs2['default']));
app.route('/flat-admin/section/', _flatAdminRoutersSectionJs2['default'].run(_initJs2['default']));
app.route('/flat-admin/template/', _flatAdminRoutersTemplateJs2['default'].run(_initJs2['default']));
app.route('/flat-admin/user/', _flatAdminRoutersUserJs2['default'].run(_initJs2['default']));
app.route('/flat-admin/blog/', _flatAdminRoutersBlogJs2['default'].run(_initJs2['default']));
app.route('/flat-admin/index/', _flatAdminRoutersIndexJs2['default'].run(_initJs2['default']));

app.always(function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.end('<h1>404</h1>');
});

_http2['default'].createServer(app.run()).listen(_initJs2['default'].config.getValue('port'));
console.log("Server Started");