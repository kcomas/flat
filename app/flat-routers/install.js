
"use strict"

//install router only used to create a user at first load

import router from '../flat-lib/server/router.js';

var installRouter = new router();

//load the install config
installRouter.loadConfig('./flat-config/installConfig.json');

installRouter.use(function(req,res,next){
    if(installRouter.get('installed') === 'true'){
        //redirect to index
    } else {
        next();
    }
});



export default installRouter;
