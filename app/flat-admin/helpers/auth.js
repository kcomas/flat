
"use strict"

/**
 * Check if a route need to be authenticated
 * @param {array} authList - the array of urls that need auth
 * @param {string} url - the url to check
 * @return {boolean} - if the url needs to be authenticated
 */
function needsAuth(authList,url){
    for(let i=0,l=authList.length; i<l; i++){
        if(url.indexOf(authList[i]) === 0){
            console.log("needs auth");
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
export default function auth(controller,authList){
    return (req,res,next)=>{
        //check if the user has a logged in session
        if(needsAuth(authList,req.url)){
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
