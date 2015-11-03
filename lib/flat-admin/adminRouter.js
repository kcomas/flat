"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _flatLibServerRouterJs = require('../flat-lib/server/router.js');

var _flatLibServerRouterJs2 = _interopRequireDefault(_flatLibServerRouterJs);

var _pagesJs = require('./pages.js');

var _pagesJs2 = _interopRequireDefault(_pagesJs);

var _pagePageManagerJs = require('./page/pageManager.js');

var _pagePageManagerJs2 = _interopRequireDefault(_pagePageManagerJs);

var _helpersAuthJs = require('./helpers/auth.js');

var _helpersAuthJs2 = _interopRequireDefault(_helpersAuthJs);

var _helpersShowErrorJs = require('./helpers/showError.js');

var _helpersShowErrorJs2 = _interopRequireDefault(_helpersShowErrorJs);

var _helpersShowSuccessJs = require('./helpers/showSuccess.js');

var _helpersShowSuccessJs2 = _interopRequireDefault(_helpersShowSuccessJs);

var adminRouter = new _flatLibServerRouterJs2['default']();

var manager = new _pagePageManagerJs2['default'](_pagesJs2['default']);

//load all of the pages into memory
var renderErr = manager.renderAll();
if (renderErr.length > 0) {
    console.dir(renderErr);
}

/**
 * List of get routes not to auto lookup
 * @type {array}
 */
var denyList = ['/flat-admin/logout'];

/**
 * Length of the deny list
 * @type {number}
 */
var denyListLength = denyList.length;

/**
 * Check if a url is in the deny list
 * @param {string} url - the url to check
 * @return {boolean} true if the url is not in the deny list
 */
function isAllowed(url) {
    for (var i = 0; i < denyListLength; i++) {
        if (url === denyList[i]) {
            return false;
        }
    }
    return true;
}

/**
 * The expression to check the urls in the next use
 * @type {regexp}
 */
var urlReg = new RegExp('^/flat-admin$|^/flat-admin/');

adminRouter.use(function (req, res, next) {
    if (req.method === 'GET' && isAllowed(req.url)) {
        manager.load(req.url.replace(urlReg, '/'), function (err, page) {
            if (err) {
                (0, _helpersShowErrorJs2['default'])(req, res, err, 404);
            } else {
                (0, _helpersShowSuccessJs2['default'])(req, res, page, 200);
            }
        });
    } else {
        next();
    }
});

//logout
adminRouter.get('/flat-admin/logout', function (req, res) {
    adminRouter.controller.sessionManager.destroy(req, res, function (err, done) {
        if (err) {
            (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
            return;
        }
        res.redirect('/flat-login');
    });
});

//render a single admin page
adminRouter.post('/flat-admin/render', function (req, res) {
    var page = req.body.page;
    var err = manager.render(page);
    if (err) {
        (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
    } else {
        (0, _helpersShowSuccessJs2['default'])(req, res, "Page Created", 200);
    }
});

//render all of the the admin pages
adminRouter.post('/flat-admin/renderAll', function (req, res) {
    var err = manager.renderAll();
    if (err.length > 0) {
        (0, _helpersShowErrorJs2['default'])(req, res, err, 500);
    } else {
        (0, _helpersShowSuccessJs2['default'])(req, res, "Pages Created", 200);
    }
});

adminRouter.always(function (req, res) {
    (0, _helpersShowErrorJs2['default'])(req, res, new Error("Not Found"), 404);
});

exports['default'] = adminRouter;
module.exports = exports['default'];