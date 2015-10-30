
"use strict"


/**
 * Function for authentication the admin routes
 * @param {object} sessionManager - the session manager
 * @param {object} userManager - the user manager
 * @return {function(req:object,req:object,next:function)} the middlewear function
 */
export default function auth(controller){
    return (req,res,next)=>{
        //check if the user has a logged in session
        if(req.url.indexOf('/flat-admin') === 0){
            var ses = controller.sessionManager.getSession(req);
            if(ses !== null){
                if(ses.getData('username')){
                    req.session = ses;
                    var user = controller.userManager.findByParam(ses.getData('username'));
                    if(user === null){
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
            next();
        }
    }
}
