"use strict"

/**
 * The class for looping through the routes and use function of the main server
 */
export default class serverLoop {

    /**
     * @constructor
     * @param {object} req - the request object
     * @param {object} res - the response object
     * @param {array} uses - the array of use functions
     * @param {array} routers - the array of routers
     * @param {function} end - the final function to be called
     */
    constructor(req,res,uses,routers,end){
        /**
         * the position of the uses array
         */
        this.usesPosition = 0;

        this.req = req;
        this.res = res;
        this.uses = uses;
        this.routers = routers;
        this.end = end;
    
    }

    /**
     * the loop function to run through all the uses and routers
     */
    loop(){
        var self = this;
        if(this.usesPostion < this.uses.length){
            this.uses[usesPosition](req,res,function next(){
                self.usesPosition++;
                //self.loop();
            });
        } else {
            //loop through the routers
            var currentRouter = null;
            this.routers.forEach(function(router){
                if(self.req.url.indexOf(router.path) > -1){
                    currentRouter = router.router;
                }
            });
            if(currentRouter === null){
                //run the end function
                this.end(this.req,this.res);
            } else {
                //run the route
                currentRouter(this.req,this.res);
            }
        }
    }
}
