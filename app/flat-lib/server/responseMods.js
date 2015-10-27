
"use strict"

import fs from 'fs';

/**
 * This function adds new methods to the response object
 * @return {function(req:object,res:object,next:function)} the middlewear function
 */
export default function responseMods(){
    return function(req,res,next){
        //redirect to a url on the site
        res.redirect = function(){

        };

    }
}
