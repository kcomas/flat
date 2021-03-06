
"use strict";

/**
 * Check if a route need to be authenticated
 * @param {array} authList - the array of urls that need auth
 * @param {string} url - the url to check
 * @return {boolean} - if the url needs to be authenticated
 */
Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = auth;
function needsAuth(authList, url) {
    for (var i = 0, l = authList.length; i < l; i++) {
        if (url.indexOf(authList[i]) === 0) {
            return true;
        }
    }
    return false;
}

/**
 * Function for authentication the admin routes
 * @param {object} controller - the memoery file controller
 * @param {array} authList - the routes that need to be authenticated
 * @return {function(req:object,req:object,next:function)} the middlewear function
 */

function auth(controller, authList) {
    return function (req, res, next) {
        //check if the user has a logged in session
        if (needsAuth(authList, req.url)) {
            var ses = controller.sessionManager.getSession(req);
            if (ses !== null) {
                if (ses.getData('username')) {
                    req.session = ses;
                    var user = controller.userManager.findByParam(ses.getData('username'));
                    if (user === null) {
                        res.redirect('/flat-login');
                        return;
                    }
                    req.user = user;
                    next();
                } else {
                    res.redirect('/flat-login');
                }
            } else {
                res.redirect('/flat-login');
            }
        } else {
            //track page views
            var data = controller.info.data;
            if (data.pageViews[req.url]) {
                data.pageViews[req.url]++;
            } else {
                data.pageViews[req.url] = 1;
            }
            next();
        }
    };
}

module.exports = exports['default'];