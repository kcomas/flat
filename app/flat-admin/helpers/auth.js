
"use strict"


/**
 * Function for authentication the admin routes
 * @param {object} controller - the main controller
 * @return {function(req:object,req:object,next:function)} the middlewear function
 */
export default function auth(sessionManager,userManager){
    return (req,res,next)=>{
        //check if the user has a logged in session
        var ses = sessionManager.getSession(req);
        if(ses !== null){
            if(ses.getData('username')){
                req.session = ses;
                var user = userManager.findByParam(ses.getData('username'));
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
    }
}
